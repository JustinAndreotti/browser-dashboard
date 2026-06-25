//Dependency imports
import express, { json } from "express";
import path from "path";
import { WebSocketServer } from "ws";
import http from "http";

//custom imports
import * as weatherController from "./app/controllers/weatherController.js";
import * as services from "./app/config/services.js";
import { getServiceComposeFile } from "./app/controllers/composeViewerController.js";

//create the express app
const port = 3000;
const app = express();

//Create the websocket server
const server = http.createServer(app);
const wss = new WebSocketServer({server, path: "/terminal"});

//Tell the server where my EJS/HTML is located
app.set('views', path.join(import.meta.dirname, 'app/views'));

//Tell the server to use my /public directory for static files
app.use(express.static(path.join(import.meta.dirname, 'app/public')));

// Prevent browser favicon.ico 404 noise
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// Was app.listen, but with websockets for some reason this needs to be server.listen
server.listen(port, "0.0.0.0", () => {
  console.log(`server listening on port ${port}`);
});



//TODO:
/**
 * Connect and listen for terminal interactions from client
 * For real time terminal
 */
wss.on("connection", (socket, req) => {
  console.log("terminal websocket connected between server and client");
  let terminalProcess = null;

  socket.on("message", (message) => {
    console.log("ws message from client:", message.toString()); 
    const raw = typeof message === "string" ? message : message.toString("utf8");

    //check if message is a JSON command (like start-terminal) then it will parse the message and
    //handle the JSON command below. If the message is raw data AND there is a terminal shell opened, then pass it as raw data into that terminal shell.  
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch (error) {
      if (terminalProcess) {
        terminalProcess.write(raw);
      }
    }

    //Handle the initial starting of the terminal
    if (msg.type === 'start-terminal') {
      //TODO:
      // spawn terminal/pty here
      // terminalProcess = ...
      // terminalProcess.on('data', (data) => socket.send(data));
    }

  });

  socket.on("close", () => {
    console.log("terminal websocket closed between server and client");
  });

  socket.send(JSON.stringify({ type: "welcome", text: "Connected to terminal backend" }));
});





/*Views*/
app.get("/", async (req, res) => {
  res.render('homepage.ejs', {
    currWeatherData: await weatherController.getCurrentWeatherData()
  });
  
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs", {
    services: services
  });
});





/*API Calls I.E Route you hit from the browser for server side info*/
app.get("/api/composeFile", async (req, res) => {
  const serviceKey = req.query.service;  //serviceKey sent over from the modal handler
  console.log(`API - Compose File Request for: ${serviceKey}`);

  //get the compose.yaml text
  try {
    const composeText = await getServiceComposeFile(serviceKey);
    res.status(200).send(composeText);
  } catch (err) {
    res.status(404).send(`Error: ${err.code}: ${err.message}`);
  }
  
  //send the compose.yaml in plain text to the browser

});
