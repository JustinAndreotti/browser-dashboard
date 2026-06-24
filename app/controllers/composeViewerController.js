import fs from "fs/promises";
import path from "path";
import * as serviceData from "../config/services.js";

export async function getServiceComposeFile(serviceKey) {
  console.log(`inside getServiceComposeFile function for the service: ${serviceKey}`);
  
  //convert serviceData into an array and match the requested service to the serviceKey
  const serviceInfo = Object.values(serviceData).find((serviceInfo) => serviceInfo.key === serviceKey);
  
  //check if a service was matched
  if (!serviceInfo) { 
      throw new Error(`could not retreive serviceInfo for ${serviceKey} in function getServiceComposeFile`);
      console.log(`could not retreive serviceInfo for ${serviceKey} in function getServiceComposeFile`);
  }
  console.log(serviceInfo);

  //check if service has a compose file
  if (serviceInfo.composeFile === 'none'){
    throw new Error(
      `service ${serviceInfo.name} does not have a compose file this could be for various reasons: \n
      - Service is an external link
      - service is built into ZimaOS like the Zima Dashboard, File browser, and web terminal
      - potentially other reasons not listed
    `);
    console.log(`service ${serviceInfo.name} does not have a compose file`);
  }

  //log that the checks were successful
  console.log(`${serviceInfo.name} is container type: ${serviceInfo.containerType}`);
  console.log(`${serviceInfo.name} has compose file located at directory: ${serviceInfo.composeFile}`);
  
  //get appropriate path to compose file based on the container type
  let servicePaths = [];
  const composeFileNames = ["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"];

  if (serviceInfo.containerType.toLowerCase() === "zimaos") {
    composeFileNames.forEach((fileName, index) => {
      servicePaths.push(`./data/zimaAppData/${serviceInfo.composeFile}/${composeFileNames[index]}`);
    });
  } else {
    composeFileNames.forEach((fileName, index) => {
      servicePaths.push(`./data/appData/${serviceInfo.composeFile}/${composeFileNames[index]}`);
    });
  };

  console.log(`potential paths to compose file for ${serviceInfo.name} are: \n ${servicePaths}`);



  //Read the composeFile into a string variable
  for (const filePath of servicePaths) {
    try {
      console.log(`Attempting to read compose file for ${serviceInfo.name} at: ${filePath}`);
      const content = await fs.readFile(filePath, "utf8");  //throws error if it doesnt succeed and goes to the catch
      console.log(`Successfully read compose file for ${serviceInfo.name} at: ${filePath}`);
      //console.log(`Text displayed from the compose file: \n\n ${content}`);
      return content;

    } catch (err) {
      console.log(`Could not reach ${filePath} \n  code: ${err.code} \n  message:${err.message}`);
    };
  };
  
}