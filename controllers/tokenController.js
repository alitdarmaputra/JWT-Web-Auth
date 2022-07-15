const Token = require("../models/Token.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const refreshToken = req.cookies && req.cookies.token;
    if(refreshToken == null) res.sendStatus(401);

    try {
        const token = await Token.findOne({ token: refreshToken }).then(results => results.token);
     
        if(!token) throw new Error("No document found");
        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err, decoded) => {
            if(err) res.sendStatus(403);
            const accessToken = jwt.sign({ uid: decoded.uid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s"});

            res.cookie("authorization", `Bearer ${accessToken}`, httpOnly=true);
            res.json({ accessToken: accessToken });
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(403);
    }
}