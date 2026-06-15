//Dependency imports
import express from "express";
import path from "path";

//custom imports
import * as weatherController from "./app/controllers/weatherController.js";
import * as services from "./app/config/services.js";
import { getServiceComposeFile } from "./app/controllers/composeViewerController.js";

const port = 3000;
const app = express();

//Tell the server where my EJS/HTML is located
app.set('views', path.join(import.meta.dirname, 'app/views'));

//Tell the server to use my /public directory for static files
app.use(express.static(path.join(import.meta.dirname, 'app/public')));

// Prevent browser favicon.ico 404 noise
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`server listening on port ${port}`);
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

  //TODO:
  //use the serviceKey to check if the service in services.js has a listed compose file path
  //if it does not have a compose file path then return an error with that response or something.

  //get the compose.yaml text
  const composeText = getServiceComposeFile(serviceKey);
  
  //send the compose.yaml in plain text to the browser
  res.status(200).send(composeText);
});
