const { listingSchema  , reviewSchema , userSchema} = require("./schemas")
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");

module.exports.validateListing = (req, res, next) => {
   // validation logic
   next();
}

module.exports.validateReview = (req,res,next)=>{
   const { error } = reviewSchema.validate(req.body)

   if(error){
      const msg = error.details.map(el=>el.message).join(",")
      throw new Error(msg)
   }else{
      next()
   }
}


module.exports.validateUser = (req,res,next)=>{
   const { error } = userSchema.validate(req.body)

   if(error){
      const msg = error.details.map(el=>el.message).join(",")
      throw new Error(msg)
   }else{
      next()
   }
}


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in first!");
        return res.redirect("/users/login");
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};