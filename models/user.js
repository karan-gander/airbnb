const { Schema,model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new Schema({
    email:{
        type:String
    }
})

userSchema.plugin(passportLocalMongoose)


module.exports = model("User",userSchema)

