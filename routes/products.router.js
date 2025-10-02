const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.models");

router.post("/create", upload.single("image"), async function (req, res) {
 try {
     let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  let product = await productModel.create({
    name,
    image :req.file.buffer,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });

  req.flash("Success","Product created successfully")
  res.redirect("/api/v1/owners");
 } catch (error) {
    res.send(error.message)
    
 }
});

module.exports = router;
