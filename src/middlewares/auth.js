const verifyToken = require("../helpers/auth").verifyToken


const authorized = (req,res,next) => {
    //bearrer  token
    let data
    try
    {
        const token = req.headers.authorization?.slice("Bearer ".length)
        if(!token) throw new Error()

        data = verifyToken(token)
    }
    catch(err)
    {
        return res.status(403).end()
    }
    req.user = data
    next()
}
module.exports = {authorized}