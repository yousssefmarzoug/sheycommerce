const mongoose = require("mongoose");

var mongoDBURL ='mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/mern-ecommerce'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose
