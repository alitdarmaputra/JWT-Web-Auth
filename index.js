require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json("Hello");
});

let port = 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});