const express = require("express")
const router = express.Router({mergeParams:true})
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError")
const Listing = require("../models/listing")
const Reviews = require("../models/reviews")
const { validateReview, isLoggedIn,isReviewAuthor } = require("../middlewares/middlewares")
const {addReview,deleteReview} = require("../controllers/reviews")

// Review Route 

router.post("/", isLoggedIn, validateReview, wrapAsync(addReview))

// Review Delte Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(deleteReview))


// Page not found Route
router.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})


module.exports = router;



