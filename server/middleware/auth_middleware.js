const SECRET = require("../config")
const jwt = require("jsonwebtoken")

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {*}
 */

function verifyToken(req, res, next) {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send("Forbidden");
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.salarie = decoded;
        req.entreprise = decoded;


    } catch (err) {
        console.log(err);
        return res.status(401).send("Unauthorized");
    }
    return next();
}

module.exports = verifyToken