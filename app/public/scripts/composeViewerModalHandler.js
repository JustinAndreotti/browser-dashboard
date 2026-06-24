/* 
  Function composeViewer() Definition
  - Function is a web script called from dashboard.ejs to add event listeners to all the buttons that bring up a modal to view the compose file of a docker container. 

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

export function composeViewer() {
  const openButtons = document.querySelectorAll(".compose-modal");
  const dialogModal = document.querySelector(".compose-dialog-container");
  const closeButton = document.querySelector("[data-close-modal]");

    
  openButtons.forEach(button => {
    button.addEventListener("click", async event => {
      //identify the serviceCard that called the event
      const serviceName = event.currentTarget.dataset.serviceName;
      const serviceKey = event.currentTarget.dataset.serviceKey;  //dataset.serviceKey === data-service-key
      console.log(`Requesting compose file from the server for service: ${serviceKey}`);

      const response = await fetch(`/api/composeFile?service=${encodeURIComponent(serviceKey)}`);
      const text= await response.text();
      console.log(`returning compose file request from service: ${serviceKey}, Response: ${text}`);

      //TODO:
      //update the modal with the appropriate Compose.yaml
      document.querySelector(".compose-dialog-service-name").textContent = serviceName;
      document.querySelector(".compose-text").textContent = text;

      //display the modal
      dialogModal.showModal();
    })
  })
  closeButton.addEventListener("click", () => {
    //close the modal
    dialogModal.close();
  })
}