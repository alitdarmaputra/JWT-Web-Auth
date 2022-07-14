const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.authorization;

    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403).redirect("/login");
        }
        req.user = user;
        next();
    });
}