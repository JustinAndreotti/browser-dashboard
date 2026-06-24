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

  openButtons.forEach(button => {
    button.addEventListener("click", async event => {
      const serviceName = event.currentTarget.dataset.serviceName;
      const serviceKey = event.currentTarget.dataset.serviceKey;  //dataset.serviceKey === data-service-key
      console.log(`Requesting terminal access from the server for service: ${serviceName}`);

      //Create and connect to web socket

      //display the modal
      dialogModal.showModal();
    })
  })

  closeButton.addEventListener("click", () => {
    //close the modal
    dialogModal.close();
  })
}