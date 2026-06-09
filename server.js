//Dependency imports
import express from "express";
import path from "path";

//custom imports
import * as weatherController from "./app/controllers/weatherController.js";

const port = 3000;
const app = express();

//Tell the server where my EJS/HTML is located
app.set('views', path.join(import.meta.dirname, 'app/views'));

//Tell the server to use my /public directory for static files
app.use(express.static(path.join(import.meta.dirname, 'app/public')));

app.listen(port, "0.0.0.0", () => {
  console.log(`server listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.render('homepage.ejs', {
    currWeatherData: await weatherController.getCurrentWeatherData()
  });
  
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});
