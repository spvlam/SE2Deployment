const express = require('express')
const router = express.Router()
const ControllerLogin = require("../controllers/login")
const passport = require('../config/facebookLogin')

// facebook authentication
router.get('/noauth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/login/noauth/loginwithFacebook',
    failureRedirect: '/'
}));
router.get('/noauth/loginwithFacebook',ControllerLogin.loginWithFacebook)
// normal
router.post("/noauth/logout",ControllerLogin.logout)
router.get("/noauth/verify",ControllerLogin.verify)
router.post("/noauth/register",ControllerLogin.register)
router.post("/noauth",ControllerLogin.login)


module.exports=router