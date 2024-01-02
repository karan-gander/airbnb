const mongoose = require("mongoose")
const { Schema, model } = mongoose;



const reviewSchema = new Schema({
    comment:String,
    review:{
        type:Number,
        min:1,
        max:5
    },
    created_at:{
        type:Date,
        default:Date.now()

    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})


module.exports = model("Review",reviewSchema)