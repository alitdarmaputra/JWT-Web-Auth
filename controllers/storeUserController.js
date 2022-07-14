const User = require("../models/User.js");

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if(error) {
            res.sendStatus(400);
        } else {
            res.redirect("/login");
        }
    });
}