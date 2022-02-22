const db = require("../database/models")

function userLoggedMiddleware(req,res,next){
    let emailInCookie = req.cookies.userEmail
    /* let userFromCookie = db.User.findOne({
        where: {
            user_email: emailInCookie
        }
    }) */
    let userFromCookie

    if(userFromCookie){
        req.session.userLogged = userFromCookie
    }

    if(req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }else{
        res.locals.isLogged = false
    }

    next()
}

module.exports = userLoggedMiddleware