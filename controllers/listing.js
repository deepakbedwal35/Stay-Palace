const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
// cloudinary 
const streamUpload = require("../utils/cloudinaryupload.js")
const cloudinary = require("../cloudConfig.js")
module.exports.index = async (req ,res)=>{
    const allListings = await Listing.find({});
    res.render("index", { allListings });
}

module.exports.renderNewListing = async(req ,res)=>{
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
    let listing = await Listing.findById(id);

     Object.assign(listing, req.body.listing);
    if(req.file){
        // upload new 
        const result = await streamUpload(req.file.buffer , "staypalace")
        // delete old
        if (listing.image && listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }
        // save new image
        listing.image = {
            url : result.secure_url , 
            filename : result.public_id
        };
    }
   await listing.save()

    req.flash("success", "Successfully updated the listing!");
    res.redirect("/listings");

}


module.exports.handleCreateListing = async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
   
    //  upload to cloudinary
    const result = await streamUpload(req.file.buffer, "staypalace");
    console.log(result)
    // create listing
    let newListing = new Listing(req.body.listing);

    //  attach image
    newListing.image = {
      url: result.secure_url,
      filename: result.public_id
    };

    //  attach owner
    newListing.owner = req.user._id;

    //  save
    await newListing.save();
  
    res.redirect("/listings");

  
};

module.exports.renderEditListing = async (req , res)=>{
    let { id } = req.params;
        let listing = await Listing.findById(id);
    
        if (!listing) {
            req.flash("error", "Listing Not Found!");
            return res.redirect("/listings");
        }
    
        res.render("edit", { listing });

}

module.exports.handleDeleteListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    // delete image from cloudinary
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  
};