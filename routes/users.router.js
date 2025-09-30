const express = require('express')
const router = express.Router();
const {signupUser,signinUser,logoutUser} = require('../controllers/auth.controllers')

router.get("/", function (req,res) {
    res.send("hellow ji")
})

router.get("/sign-up", function (req,res) {
    res.render("index")
} );
router.post("/sign-up", signupUser );

router.post("/sign-in", signinUser );

router.get("/logout", logoutUser );

module.exports = router;