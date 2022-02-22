const db = require("../database/models"),
      {validationResult} = require("express-validator"),
      bcryptjs = require("bcryptjs");

const userController = {
    ayuda: (req,res) => {
        res.render("users/ayuda")
    },
    registerGet: (req,res) => {
        res.render("users/register")
    },
    registerPost:(req,res) => {
        //Imágen y carga de datos
        let image;

        if(req.file){
            image = req.file.filename
        }else{
            image = "default-image.png"
        }

        //Validaciones correspondientes
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const registerUser = db.User.create({
                user_fullname: req.body.registroFullname,
                user_nickname:req.body.registroUsuario,
                user_email: req.body.registroEmail,
                user_dni: req.body.registroDni,
                user_cellphone: req.body.registroTel,
                fiscal_adress: req.body.registroDir,
                departament: req.body.registroDepto,
                postal_code: req.body.registroPostal,
                locality: req.body.registroLocality,
                user_province: req.body.registroProvince,
                user_lock:bcryptjs.hashSync(req.body.registroLock,10),
                user_lockrepeat:bcryptjs.hashSync(req.body.registroLockRepeat,10),
                imageUser:image,
                rol_id:req.body.registroRol
            })

            res.redirect("/")
        }else{
            res.render("users/register", {
                errors:errors.mapped(),
                old: req.body
            })
        }
    },
    restablecer: (req,res) => {
        res.render("users/restablecer")
    },
    loginGet: (req,res) => {
        res.render("users/login")
    }/* ,
    loginPost:(req,res) => {
        let errors = validationResult(req)
        
        db.User.findOne({
            where: {
                user_email: req.body.userEmail
            }
        })
        .then(userToLogin => {
            if(userToLogin){
                let comparePassword = bcryptjs.compareSync(req.body.userLock, userToLogin.user_lock)
                
                if(comparePassword){
                    delete userToLogin.userLock
                    delete userToLogin.userLockRepeat
                    req.session.userLogged = userToLogin
                    
                    if(req.body.remember){
                        res.cookie("userEmail", req.body.userEmail,{maxAge: 1000 * 60})
                    }
                    return res.redirect("/pageProfile")
                }
            }
    
            return res.render("users/login",{
                errors:errors.mapped(),
                old:req.body
            })
        })
    },
    logout:(req,res) => {
        res.clearCookie("userEmail")
        req.session.destroy()
        return res.redirect("/")
    }, */,
    pageProfile:(req,res) => {
        res.render("users/pageProfile",{userLogged: req.session.userLogged})
    },
    editProfile:(req,res) => {
        res.render('users/editProfile')
    }
}

module.exports = userController;