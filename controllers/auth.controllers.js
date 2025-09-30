const bcrypt = require('bcrypt');
const userModel = require('../models/user.models');
const { generateToken } = require('../utils/genratetoken');

module.exports.signupUser = async function (req, res) {
    let { fullname, email, password, contact } = req.body;

    let checkUser = await userModel.findOne({ email });
    if (checkUser){
        req.flash("error","Email is already registered");
             return res.redirect("/shop");

    } 

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createduser = await userModel.create({
                fullname,
                email,
                password: hash,
                contact
            });

            let token = generateToken(createduser);
            res.cookie("token", token);
            console.log(createduser);

            res.send("User created successfully");
        });
    });
};

module.exports.signinUser = async function (req, res) {
    let { email, password } = req.body;

    let fetchUser = await userModel.findOne({ email });
    if (!fetchUser){
        req.flash("error","Email or Password Incorrect");
             return res.redirect("/");

    } 

    bcrypt.compare(password, fetchUser.password, function (err, result) {
        if (result) {
            let token = generateToken(fetchUser);
            res.cookie("token", token);
            res.redirect("/shop");
        } else {
            req.flash("error","Email or Password Incorrect");
             return res.redirect("/");
        }
    });
};


module.exports.logoutUser = function (req, res) {
    
    res.cookie("token","");
    req.flash("error","Logout Succefully...");
    return res.redirect("/");
};

