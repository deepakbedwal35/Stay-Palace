const express = require("express");
const router = express.Router();
const User = require("../models/user");



// Signup form
module.exports.handleGetSignup =  (req, res) => {
    res.render("users/signup");
};


// Signup logic
module.exports.handleSignupUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            req.flash("error", "All fields are required");
            return res.redirect("/users/signup");
        }

        let newUser = new User({ username, email });

        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        req.flash("success", "Welcome to Staypalace");
        res.redirect("/users/login");
        
    } catch(e){
        req.flash("error" , e.message);
        res.redirect("/users/signup");
    }   

};

module.exports.handleGetLogin = (req, res) => {
  res.render("users/login");
};


module.exports.handleAuthLogin = async (req, res) => {
     req.flash("success" , "Welcome Back!");
     res.redirect("/listings");


    

};

