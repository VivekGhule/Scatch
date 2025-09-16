const express = require("express");
const router = express.Router();
const ownermodel = require("../models/owners.models");

if (process.env.NODE_ENV === "development") {
  router.post("/new", async function (req, res) {
    let owners = await ownermodel.find();
    if (owners.length > 0)
      return res
        .status(500).send("You don't have permission to create a new owner.");

        let {fullname,email,password,contact,gstin} = req.body

    let createdowner = await ownermodel.create({
      fullname,
      email,
      password,  
      gstin,
    });
    res.status(201).send(createdowner);
  });
}

router.get("/", function (req, res) {
  let Success = req.flash("Success")
  res.render("createproducts", { Success });
});

module.exports = router;
