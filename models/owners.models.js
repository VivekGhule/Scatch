const mongoose = require('mongoose');
const ConnectDB = require('../config/mongoose-connection')

ConnectDB();

let ownerschema = new mongoose.Schema({
    fullname: {
        type : String,
        minLength:3,
        trim:true  
    },
    email: {
        type : String,  
    },
    password: {
        type : String,  
    },
   
    products: {
        type : Array, 
        default:[] 
    },
    image: {
        type : String, 
        
    },
    gstin: {
        type : String, 
        
    },
    
})

module.exports = mongoose.model("Owner",ownerschema)

