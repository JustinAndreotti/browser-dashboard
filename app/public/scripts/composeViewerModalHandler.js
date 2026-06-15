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
      document.querySelector(".compose-dialog-service-name").innerHTML = serviceName;

      //display the modal
      dialogModal.showModal();
    })
  })

  

  closeButton.addEventListener("click", () => {
    //TODO:
    //Return the text to default


    //close the modal
    dialogModal.close();
  })
}