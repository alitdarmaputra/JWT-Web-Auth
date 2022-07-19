const User = require("../models/User.js");

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json({ location: "/login" });
        }
    });
}