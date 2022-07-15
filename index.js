require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
const dashboardController = require("./controllers/dashboardController.js");
const dashboardMenuController = require("./controllers/dashboardMenuController.js");
const tokenController = require("./controllers/tokenController.js");

// Middleware
const authMiddleware = require("./middleware/authMiddleware.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get("/", homeController);
app.get("/login", loginController);
app.get("/signup", signupController);
app.post("/users/login", loginUserController);
app.post("/users/signup", storeUserController);
app.get("/users/token", tokenController);
app.get("/dashboard", authMiddleware, dashboardController);
app.get("/dashboard/:menu", authMiddleware, dashboardMenuController);
let port = 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});