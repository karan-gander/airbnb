const userModel = require("../models/user.js")

module.exports.renderSignup = (req, res) => {

    res.render("users/signup.ejs")
}

module.exports.registarUser = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;

        let newUser = new userModel({ username, email, password })

        let registerUser = await userModel.register(newUser, password)
        req.login(registerUser,(err)=>{
            if(err) return next(err)
            req.flash("success","Welcome Back!")
            res.redirect("/listings")
        })
        //console.log(registerUser)
        
    }

    catch (err) {
        req.flash("error", err.message)
        res.redirect("/signup")
    }


}



module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.userLogin =async(req, res) => {
    req.flash("success","Welcome Back!")
    res.redirect(res.locals.redirectUrl || "/listings")
     
 }


module.exports.userLogout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err) return next(err)
            
        
        req.flash("success","Logged Out!")
        res.redirect("/listings")
    })
}