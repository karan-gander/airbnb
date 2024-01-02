const express = require("express")
const router = express.Router({ mergeParams: true })
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError")
const Listing = require("../models/listing")
const { listingSchema, reviewSchema } = require("../Schema")
const { isLoggedIn, isOwner, validateListing } = require("../middlewares/middlewares")
// const flash = require("connect-flash")
const { index, renderNewForm, showListings, createListing, editListing, updateListing, deleteListing } = require("../controllers/listing")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router
.route("/")
.get(wrapAsync(index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(createListing))


// New Route 
router.get("/new", isLoggedIn, renderNewForm)



// Show route
router
.route("/:id")
.get(wrapAsync(showListings))
.put(isLoggedIn, isOwner,upload.single("listing[image]"),validateListing, wrapAsync(updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(deleteListing))
//Create route





// edit route 

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing))


// Update Route



module.exports = router

