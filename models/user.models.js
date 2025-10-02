const mongoose = require('mongoose');
const ConnectDB = require('../config/mongoose-connection')

ConnectDB();

let userschema = new mongoose.Schema({
    fullname: {
        type : String,  
        minLength:3,
        trim:true  
    },
    email: {
        type : String,  
        unique: [true, "email is already registared"],
        lowercase: true
    },
    password: {
        type : String,  
    },
    cart: [{
        type : mongoose.Schema.Types.ObjectId,  
        ref:"Product"
    }],
    orders: {
        type : Array, 
        default:[] 
    },
    contact: {
        type : Number, 
       
    },
    image: {
        type : String, 
        
    },
    
})

module.exports = mongoose.model("User",userschema)

