const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You must send a token to this end point" })
    }

    try {
        req.tokenData = jwt.verify(token,"Shlomo");
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "Token invalid or expired" });
    }
}