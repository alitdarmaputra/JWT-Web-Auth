const Token = require("../models/Token.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const refreshToken = req.cookies && req.cookies.token;
    if(refreshToken == null) return res.sendStatus(401);

    try {
        const token = await Token.findOne({ token: refreshToken }).then(results => results && results.token);

        if(!token) throw new Error("Document not found");

        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err, decoded) => {
            if(err) return res.sendStatus(403);
            else {
                const accessToken = jwt.sign({ uid: decoded.uid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s"});
        
                res.cookie("authorization", `Bearer ${accessToken}`, httpOnly=true);
                res.json({ accessToken: accessToken });
            }
        });
    } catch(err) {
        res.sendStatus(401);
        console.log(err);
    }
}