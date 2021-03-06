const bcrypt = require("bcrypt");
const Users = require("../models/User.js");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

async function generateRefreshToken(uid) {
    const refreshToken = jwt.sign(uid, process.env.ACCESS_TOKEN_REFRESH, { expiresIn: "5h" });

    try {
        // store to database
        await Token.create({ token: refreshToken });
    } catch (e) {
        console.log(e);
    }

    return refreshToken;
}

module.exports = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await Users.findOne({ username: username });
        bcrypt.compare(password, user.password, async (err, isSame) => {
            if(isSame) {
                const accessToken = jwt.sign({uid: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s"});
                res.cookie("authorization", `Bearer ${accessToken}`, httpOnly=true);

                const refreshToken = await generateRefreshToken({ uid: user._id });
                res.cookie("token", refreshToken, httpOnly=true);

                res.json({ "location": "/dashboard" });
            } else {
                res.status(401).send({ 
                    message: "Invalid username and password"
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}