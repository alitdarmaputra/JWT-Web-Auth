require("dotenv").config();
const express = require("express");

const app = express();
app.set("view engine", "ejs");

// Controllers
const homeController = require("./controllers/homeController.js");
const loginController = require("./controllers/loginController.js");
const signupController = require("./controllers/signupController.js");

// Routes
app.get("/", homeController);
app.get("/login", loginController);
app.get("/signup", signupController);

let port = 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});