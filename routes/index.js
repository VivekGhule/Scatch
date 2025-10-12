const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel = require('../models/product.models');
const userModels = require('../models/user.models');

router.get("/",function (req,res) {
    let error = req.flash("error");
    res.render("index",{error, loggedin: false})

});

router.get("/shop",isLoggedIn,async function (req,res){
    let products = await productModel.find()
    let Success = req.flash("Success")
    res.render("shop",{ products,Success  });
})
router.get("/cart",isLoggedIn,async function (req,res){
    let fetchUser = await userModels.findOne({email : req.user.email}).populate("cart");

   const bill = Number(fetchUser.cart[0].price) + 20 - Number(fetchUser.cart[0].discount);
    
    res.render("cart",{fetchUser, bill});
})
router.get("/cart/:id",isLoggedIn,async function (req,res){
    let fetchUser = await userModels.findOne({email : req.user.email});
    fetchUser.cart.push(req.params.id);
    await fetchUser.save();
    req.flash("Success","Product Added Successfully")
    res.redirect("/shop");
})

module.exports = router