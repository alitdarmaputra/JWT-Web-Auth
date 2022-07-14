require("dotenv").config();
const express = require("express");

const app = express();
app.set("view engine", "ejs");

// Route

app.get("/", (req, res) => {
    res.render("homepage");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

let port = 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});