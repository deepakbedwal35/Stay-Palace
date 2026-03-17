const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { handleGetSignup, handleSignupUser, handleGetLogin, handleAuthLogin } = require("../controllers/user");
const {validateUser} = require("../middleware.js")

// Signup form
router
.route(("/signup"))
.get(handleGetSignup)
.post(wrapAsync(handleSignupUser))


router
.route("/login")
.get(handleGetLogin)
.post(passport.authenticate("local" ,{
    failureRedirect : '/users/login', 
    failureFlash : true}),
     wrapAsync(handleAuthLogin))








router.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err: { message, statusCode } });
});

module.exports = router;