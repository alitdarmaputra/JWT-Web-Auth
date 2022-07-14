const bcrypt = require("bcrypt");
const Users = require("../models/User.js");
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
    return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3s"});
}

module.exports = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await Users.findOne({ username: username });
        bcrypt.compare(password, user.password, (err, isSame) => {
            if(isSame) {
                const accessToken = generateAccessToken({ username: user.username});
                res.cookie("authorization", accessToken, httpOnly=true);
                res.redirect("/dashboard");
            } else {
                res.sendStatus(401);
            }
        });
    } catch (err) {
        res.sendStatus(401);
    }
}