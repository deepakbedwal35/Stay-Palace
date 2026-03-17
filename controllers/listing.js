const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

module.exports.index = async (req ,res)=>{
    const allListings = await Listing.find({});
    res.render("index", { allListings });
}

module.exports.handleNewListing = async(req ,res)=>{
    res.render("new");
}

module.exports.handleShowListing = async(req, res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({
    path: "reviews",
    populate: {
        path: "author"
    }
    });
    if (!listing) {
        req.flash("error", "Listing Not Found!");
        return res.redirect("/listings");
    }

    res.render("show", { listing });

}


module.exports.handleUpdateListing = async(req, res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {
        new: true,
        runValidators: true
    });

    req.flash("success", "Successfully updated the listing!");
    res.redirect("/listings");

}

module.exports.handleCreateListing = async (req, res) => {

    let newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;   // ⭐ VERY IMPORTANT

    await newListing.save();

    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");

}

module.exports.handleEditListing = async (req , res)=>{
    let { id } = req.params;
        let listing = await Listing.findById(id);
    
        if (!listing) {
            req.flash("error", "Listing Not Found!");
            return res.redirect("/listings");
        }
    
        res.render("edit", { listing });

}

module.exports.handleDeleteListing = async(req, res)=>{
     let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
}