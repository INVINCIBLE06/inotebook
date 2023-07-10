var jwt = require('jsonwebtoken');
var authConfig = require('../configs/auth.config');

exports.fetchUserDetail = async (req, res, next) =>
{
    const token = await req.header('auth-token');
    if (!token) 
    {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try
    {
        const data = jwt.verify(token, authConfig.secret);
        req.user = data.user;
        next(req.user);
    }
    catch(error)
    {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
};