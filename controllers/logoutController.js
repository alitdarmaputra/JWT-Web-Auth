const Token = require("../models/Token.js");

module.exports = async (req, res) => {
    try {
        await Token.findOneAndDelete({ token: req.cookies.token });
        res.sendStatus(204);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
}