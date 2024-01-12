const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        console.log('middleware-problem1');
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, id } = decoded;
        req.email = email;
        req.id = id;
        next();
    } catch (error) {
        console.log('middleware-problem2');
        next("Authentication failure!")
    }
}
module.exports = checkLogin;