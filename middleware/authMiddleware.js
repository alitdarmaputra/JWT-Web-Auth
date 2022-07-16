const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.authorization && req.cookies.authorization.split(" ")[1];
 
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, uid) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.uid = uid;
        next();
    });
}