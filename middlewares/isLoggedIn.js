const jwt = require('jsonwebtoken')
const userMOdel = require('../models/user.models')

module.exports = async function (req,res,next) {
    if (!req.cookies.token) {
        req.flash("error","you need to login First");
        return res.redirect("/")
        
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userMOdel
                    .findOne({email : decoded.email}).select("-password");
        req.user = user;
        next();


        
    } catch (error) {
        req.flash("error","Something went wrong");
        return res.redirect("/")
        
    }
    
}