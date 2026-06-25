# xterm.js + WebSocket Terminal Guide

This document explains the client/server flow for using xterm.js with WebSockets, including the difference between control messages and raw terminal data.

## 1) WebSocket connection basics

### What the client does

```javascript
const socket = new WebSocket(`ws://${window.location.host}/terminal`);
```

- `ws://` means open a WebSocket connection.
- `window.location.host` is the same host and port as the served page.
- `/terminal` is the path the server will accept for WebSocket upgrades.

### What the server does

```javascript
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/terminal' });
```

- `http.createServer(app)` creates a low-level HTTP server.
- `new WebSocketServer({ server, path: '/terminal' })` tells the `ws` library to accept WebSocket upgrades on that path.
- The browser sends a handshake, the server upgrades the connection, and then both sides can exchange messages without new HTTP requests.

---

## 2) What `socket.send(...)` does

In the browser:

```javascript
socket.addEventListener('open', () => {
  socket.send(JSON.stringify({
    type: 'start-terminal',
    service: serviceKey
  }));
});
```

- `JSON.stringify(...)` converts a JavaScript object into a JSON string.
- `socket.send(...)` sends that string over the open WebSocket.
- The actual payload on the wire is text like:

```text
{"type":"start-terminal","service":"portainer"}
```

---

## 3) What the server receives

The server receives the raw WebSocket data in the `message` event.

```javascript
socket.on('message', (message) => {
  console.log('ws message from client:', message.toString());
  console.log(JSON.parse(message.toString()));
});
```

Important:

- `message` is not the original object.
- It is raw data from the WebSocket frame, usually a `Buffer` in Node.
- `message.toString()` converts it to readable JSON text.
- `JSON.parse(...)` converts that text into a JavaScript object.

This is wrong:

```javascript
let msg = message.toString();
console.log(msg.service);
```

Because `msg` is a string, not an object.

Correct is:

```javascript
const msg = JSON.parse(message.toString());
console.log(msg.service);
```

---

## 4) Why `JSON.parse` is necessary

Think of the payload like a letter:

- `socket.send(JSON.stringify(...))` writes the letter.
- `socket.on('message', ...)` receives the letter as raw text.
- `JSON.parse(...)` reads the letter and turns it into a usable object.

Without parsing, you only have the raw text content.

---

## 5) What xterm.js expects

xterm.js is a terminal emulator in the browser. It expects raw terminal input, not JSON commands.

### Two different kinds of traffic

- **Control messages**: JSON commands such as `start-terminal`, `resize`, or `stop-terminal`
- **Terminal data**: raw bytes or characters from a shell or PTY

If you mix them, you must handle the distinction in code.

---

## 6) Two common approaches

### Option A: control message first, then raw terminal data

This is usually the best fit for your existing structure.

1. Browser opens the WebSocket.
2. Browser sends a JSON control message:

```json
{ "type": "start-terminal", "service": "portainer" }
```

3. Server parses the JSON and starts the terminal.
4. Server sends raw shell output back over the same socket.
5. Browser writes that raw output into xterm.
6. Browser sends keystrokes as raw data back to the server.
7. Server writes that raw data into the shell stdin.

### Option B: use `xterm-addon-attach`

This addon expects the socket to carry only raw terminal bytes.

Client:

```javascript
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';

const term = new Terminal();
term.open(document.getElementById('terminal'));

const socket = new WebSocket(`ws://${window.location.host}/terminal`);
const attachAddon = new AttachAddon(socket);
term.loadAddon(attachAddon);
```

Server:

- accept the WebSocket upgrade
- spawn a PTY or shell
- forward PTY output to `socket.send(...)`
- forward incoming WS data to PTY stdin

If you use this style, do not send JSON commands over the same socket unless you parse them first.

---

## 7) What `xterm-addon-attach` does

`AttachAddon` binds xterm directly to the WebSocket:

- incoming WebSocket data is written to the terminal display
- terminal keystrokes are sent back over the WebSocket

It does not understand JSON control messages. It expects raw terminal bytes.

So if you want to use it, either:

- use a separate control channel for JSON, or
- parse the first message as JSON and only send raw data after the session starts.

---

## 8) How the server should handle `start-terminal`

Your current code logs messages, but a real terminal needs to do more:

1. parse the first incoming JSON message
2. verify `msg.type === 'start-terminal'`
3. spawn a shell or PTY
4. send shell output to the socket
5. forward incoming socket data to the shell stdin

That is the actual runtime goal for an interactive terminal.

---

## 9) Why your current code doesn’t fully solve xterm yet

Your current code handles WebSocket setup and the first message, but it still does not:

- start a PTY or shell process
- send shell output back to the browser
- link xterm input/output to the shell

So the missing pieces are server-side shell spawning, session lifecycle, and separating control messages from raw terminal traffic.

---

## 10) Short mental model

Think of the architecture like this:

- `WebSocket` = the pipe between browser and server
- `JSON.stringify(...)` = writing a control packet into the pipe
- `JSON.parse(...)` = reading that control packet on the server
- `xterm.js` = the browser terminal display
- `AttachAddon` = a shortcut that binds the WS directly to xterm
- `socket.on('message', ...)` = the server’s receive function for everything that comes through the pipe

---

## 11) Recommended clean path

A reliable flow is:

1. open the WebSocket
2. send a JSON start message
3. server parses it and starts the terminal
4. server responds with raw shell data
5. browser writes raw shell data into xterm
6. browser sends user keystrokes as raw input
7. server feeds those keystrokes to the shell

This keeps command/control separate from terminal data.

---

## Example server-side handler pattern

```javascript
wss.on('connection', (socket) => {
  let terminalProcess = null;

  socket.on('message', (message) => {
    const raw = typeof message === 'string'
      ? message
      : message.toString('utf8');

    let msg;
    try {
      msg = JSON.parse(raw);
    } catch (error) {
      if (terminalProcess) {
        terminalProcess.write(raw);
      }
      return;
    }

    if (msg.type === 'start-terminal') {
      // spawn terminal/pty here
      // terminalProcess = ...
      // terminalProcess.on('data', (data) => socket.send(data));
    }
  });
});
```

## Example browser pattern for xterm

```javascript
const term = new Terminal();
term.open(document.getElementById('terminal'));

const socket = new WebSocket(`ws://${window.location.host}/terminal`);

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({
    type: 'start-terminal',
    service: serviceKey
  }));
});

socket.addEventListener('message', (event) => {
  term.write(typeof event.data === 'string' ? event.data : event.data.toString());
});

term.onData((data) => {
  socket.send(data);
});
```

## Key takeaway

- Use JSON for control messages.
- Use raw data for terminal input/output.
- Parse JSON on the server before accessing fields.
- `xterm-addon-attach` is best for raw data only.
- If you want both control and terminal data on one socket, handle the first message as JSON and treat later traffic as raw bytes.
