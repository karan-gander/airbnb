let express = require("express")
const wrapAsync = require("../utils/wrapAsync")
const userModel = require("../models/user.js")
const passport = require("passport")
const { redirectUrl } = require("../middlewares/middlewares.js")
const {renderSignup,registarUser, renderLogin, userLogin, userLogout} = require("../controllers/user.js")

const router = express.Router({ mergeParams: true })



router
.route("/signup")
.get(renderSignup)
.post(wrapAsync(registarUser))


//router.post("/signup", )

//login routes 
router
.route("/login")
.get(renderLogin)
.post(redirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userLogin)






// log out user
router.get("/logout",userLogout)

module.exports = router