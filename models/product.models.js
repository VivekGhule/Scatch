const mongoose = require('mongoose');
const ConnectDB = require('../config/mongoose-connection')

ConnectDB();

let productschema = new mongoose.Schema({
    name: {
        type : String,  
    },
    image: {
        type : String,  
    },
    price: {
        type : Number,  
    },
    discount: {
        type : Number,  
        default:0
    },
    bgcolor: {
        type : String,  
    },
    panelcolor: {
        type : String,  
    },
    textcolor: {
        type : String,   
    },
    
})

module.exports = mongoose.model("Product",productschema)

