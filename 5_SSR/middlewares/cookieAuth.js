const {getUser} = require("../service/auth");

function checkForAuthentication(req, res, next){
    //below two function doing most of same work it is for authorization
    const authorizationHeaderValue = req.headers["authorization"];
    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
        return next();
    }

    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
    return next();
}

//role like admin
function restrictTo(roles){
    return function (req, res, next){
        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
}
