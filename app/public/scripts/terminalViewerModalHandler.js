/* 
  Function terminalViewer() Definition
  - Function is a web script called from dashboard.ejs to add event listeners to all the buttons that bring up a modal to view the terminal of a docker container. 

  openButtons - All buttons that open a compose file on the current dashboard.ejs page
  dialogModal - The modal to update and display the compose file
  closeButton - The button to close the modal

  - The two following variables use a custom data field that I applied to each serviceCard.ejs 
    template. 
  - in serviceCard.ejs, the data fields data-service-key & data-service-name automatically get
    converted to camelCase and are accessed with dataset.serviceKey & dataset.serviceName
    respectively.
  serviceName - the name of the service that was clicked on
  serviceKey - the key of the service that was called

*/
export function terminalViewer() {
  const openButtons = document.querySelectorAll(".terminal-modal");
  const dialogModal = document.querySelector(".terminal-dialog-container");
  const closeButton = document.querySelector("[data-close-terminal-modal]");

  //Create a terminal and connect it to the #terminal div
  var term = new Terminal();
  term.open(document.getElementById("terminal"));
  term.write("$ "); 

  //add event listeners and handlers to the buttons
  openButtons.forEach(button => {
    button.addEventListener("click", async event => {
      const serviceName = event.currentTarget.dataset.serviceName;
      const serviceKey = event.currentTarget.dataset.serviceKey;  //dataset.serviceKey === data-service-key
      console.log(`Requesting terminal access from the server for service: ${serviceName}`);

      //Create and connect to web socket
      const socket = new WebSocket(`ws://${window.location.host}/terminal`);

      term.clear();
      term.write(`Connecting to ${serviceName}...\r\n`);
      
      //Send message on websocket connection
      socket.addEventListener("open", () => {
        console.log(`Websocket opened with service: ${serviceName}`);
        //Send over the service key and the action taken
        socket.send(JSON.stringify({
          type: "start-terminal",
          service: serviceKey
        }));
      });

      term.onData((data) => {
        socket.send(JSON.stringify({type: "input", data}));
      });

      //Add an event listener for when the modal is closed to also close the socket
      closeButton.addEventListener("click", () => {
        //close the websocket connection
        
        // Close the modal
        dialogModal.close();
      });

      //add an error handler for the websocket
      socket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
      });



      //display the modal
      dialogModal.showModal();
    })
  })
}















function proccessTerminalInput() {
  term.onData((data) => {
  switch (data) {
    case '\r': // Enter
      term.write('\r\n');
      currentLine = '';
      term.write('$ ');
      break;

    case '\u007f': // Backspace
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1);
        term.write('\b \b');
      }
      break;

    default:
      currentLine += data;
      term.write(data);
      break;
    }
  });
}