const Listing = require("../models/listing")
const Review = require("../models/reviews")
const ExpressError = require("../utils/ExpressError")
const {listingSchema,reviewSchema} = require("../Schema")
module.exports.isLoggedIn = (req, res, next)=>{
    
    if(!req.isAuthenticated()){
        // orginal url saved if user is not lgged in 
        req.session.redirectUrl = req.originalUrl
        req.flash("error","You must be logged in to create a listing")
        res.redirect("/login")

    }
    else{
        return next()
    }
}


module.exports.redirectUrl = (req,res,next)=>{

    res.locals.redirectUrl = req.session.redirectUrl;
    next()
}




module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params
    let listing = await Listing.findById(id).populate("owner");
    
    if(!listing.owner._id.equals(res.locals.curruntUser._id)){
        req.flash("error","You are not owner of listing");
        return res.redirect(`/listings/${id}`)
    }
    next()
}



module.exports.validateListing = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body)
     console.log(error)
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    next()


}


module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    next()
}






module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params
    let review = await Review.findById(reviewId).populate("author");
    
    if(!review.author._id.equals(res.locals.curruntUser._id)){
        req.flash("error","You are not author of review");
        return res.redirect(`/listings/${id}`)
    }
    next()
}
