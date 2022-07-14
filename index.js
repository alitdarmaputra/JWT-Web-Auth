require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASE_URI);

// Controllers
const homeController = require("./controllers/homeController.js");
const loginController = require("./controllers/loginController.js");
const signupController = require("./controllers/signupController.js");
const storeUserController = require("./controllers/storeUserController.js");
const loginUserController = require("./controllers/loginUserController.js");
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", homeController);
app.get("/login", loginController);
app.post("/users/login", loginUserController);
app.get("/signup", signupController);
app.post("/users/signup", storeUserController);

let port = 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});