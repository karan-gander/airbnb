const mongoose = require("mongoose")
const Listing = require("../models/listing")
const initData = require("../init/data")



main().then(()=>console.log("Connection sucessfull")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let initDB = async ()=>{
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj)=>({...obj,owner:"657b1dbb6b931696b5679e23"}))
    await Listing.insertMany(initData.data)
}

initDB()
