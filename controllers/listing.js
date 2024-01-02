const Listing = require("../models/listing")
const mbxGeocodding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocodding({ accessToken: mapToken }); 




module.exports.index = async (req, res) => {
    let allLisiting = await Listing.find()
    //console.log(allLisiting)
    res.render("listings/index.ejs", { allLisiting })
}

module.exports.renderNewForm = (req, res) => {
   
    res.render("listings/new.ejs")

}

module.exports.showListings = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner")
    // console.log(listing)
    if (!listing) {
        req.flash("error", "Listing you requested does not exist")
        res.redirect("/listings")
    }
    // console.log(listing)
    res.render("listings/show.ejs", { listing })
}



module.exports.createListing = async (req, res) => {
  console.log(req.body)

  let response =  await  geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()

        
      //console.log(response.body.features[0].geometry)
    let url = req.file.path;
    let filename = req.file.filename
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id
    newListing.image = {url,filename}
    newListing.geometry = response.body.features[0].geometry
    let savelist = await newListing.save()
    console.log(savelist)
    req.flash("success", "New listing created successfully!")
    res.redirect("/listings")



}

module.exports.editListing = async (req, res) => {

    let { id } = req.params;
    
    let listing = await Listing.findById(id);
    let origanalUrl = listing.image.url;
    origanalUrl =  origanalUrl.replace("/upload","/upload/w_250")
    if (!listing) {
        req.flash("error", "Listing you requested does not exist")
        return res.redirect("/listings")
    }

    res.render("listings/edit.ejs", { listing,origanalUrl })

}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename
        listing.image={url,filename}
        await listing.save()
    }
    req.flash("success", "Listing edited successfully!")
    res.redirect(`/listings/${id}`)

}


module.exports.deleteListing = async (req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted successfully!")
    res.redirect("/listings")
}