const User = require("../models/User.js");

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if(error) {
            res.status(400).json({ message: "Invalid username and password" });
        } else {
            res.json({ location: "/login" });
        }
    });
}