const express = require('express');
const Listing = require('../models/listing');
const Review = require("../models/review")





 

// review route
module.exports.handleCreateReview = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      const err = new Error("Listing Not Found!");
      err.status = 404;
      return next(err);
    }
    // create review
    let review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    console.log(review);
    req.flash("success", "Successfully added a new review!");
    res.redirect(`/listings/${id}`);
};

// Delete review
module.exports.handleDeleteReview = async (req, res, next) => {
    let { id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    console.log("Deleted review with id:", reviewId);
    req.flash("success", "Successfully deleted the review!");

    res.redirect(`/listings/${id}`);
  
};



