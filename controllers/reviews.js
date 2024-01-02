const Listing = require("../models/listing")
const Reviews = require("../models/reviews")



module.exports.addReview = async (req,res)=>{
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id
    listing.reviews.push(newReview)
    

    await listing.save()
    await newReview.save()
    req.flash("success","New review added successfully!")
    res.redirect(`/listings/${listing._id}`)

}


module.exports.deleteReview = async (req,res)=>{
    let {id,reviewId} = req.params;
    
    
    await  Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success","review deleted successfully!")
    res.redirect(`/listings/${id}`)


    
}