const mongoose = require("mongoose")
const { Schema, model } = mongoose;
const review = require("./reviews.js")


const listingSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image:{
        filename:{
          type: String,
          default:"Proparty Image"

          
        },
        url:{
          type: String,
          default:'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww'
          
        }
      },
    price:{
      type:Number,
      default:20000
    },
    location: String,
    country: String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review"
      }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    geometry:{
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    category:{
      type:String,
      enum:["trending","rooms","boat","farm","surfing","beach","pool","hiking","mountain"]
    }

})
listingSchema.post("findOneAndDelete",async (listing)=>{
  if(listing){

    await review.deleteMany({_id:{$in:listing.reviews}})
  }
})

const Listing = new model("Listing", listingSchema)


module.exports = Listing;