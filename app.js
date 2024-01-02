if(process.env.NODE_ENV !="production"){
    require("dotenv").config()
}



const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const joi = require("joi")
const listingRoute = require("./routes/listing.js")
const reviewsRoute = require("./routes/review.js")
const userRoute = require("./routes/user.js")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const UserModel  = require("./models/user.js");



// EJs Setup

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "/public")))



// Data Base Connetion
const MONGO_DB_URL = process.env.MONGODB_URL
main().then(() => console.log("Connection sucessfull")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_DB_URL);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get("/", (req, res) => {
    res.redirect("/listings")

})

const store = MongoStore.create({
    mongoUrl:MONGO_DB_URL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})

store.on("error",()=>{
    console.log("Error in mongo store ")
})
app.use(session({
    store:store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(UserModel.authenticate()))

passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    console.log(req.user)
    res.locals.curruntUser = req.user

     
    next()
})


app.get("/demo",async(req,res)=>{

    let fakeUser = new UserModel({
        email:"meghawalkaran@gmail.com",
        username:"Karan-meghawal"
    })

   let registeredUser =  await UserModel.register(fakeUser,"karan")
    res.send(registeredUser)
    
})

app.use("/",userRoute)
app.use("/listings", listingRoute)
app.use("/listings/:id/reviews", reviewsRoute)



// Error Handling Middleware
app.use((err, req, res, next) => {
    // console.log(err.name)
    let { statusCode = 500, message = "Something went wrong" } = err
    // res.status(statusCode).send(message)
    res.status(statusCode).render("listings/error.ejs", { message })
})

app.listen(3000, () => {
    console.log("App is running on port 3000")

})