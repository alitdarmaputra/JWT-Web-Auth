const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.authorization && req.cookies.authorization.split(" ")[1];
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, uid) => {
        if (err) {
            return res.status(403).json({ error: err });
        }
        req.uid = uid;
        next();
    });
}