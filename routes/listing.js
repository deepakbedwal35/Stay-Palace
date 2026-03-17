const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const {index ,
    handleNewListing ,
    handleShowListing,
    handleCreateListing , 
    handleUpdateListing,
    handleEditListing,
    handleDeleteListing
     } = require("../controllers/listing")
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { validateListing , isLoggedIn , isOwner } = require("../middleware");

router
.route("/")
.get(wrapAsync(index))
.post(isLoggedIn, validateListing, wrapAsync(handleCreateListing));
 
router.get("/new", isLoggedIn, handleNewListing);

router
.route("/:id")
.get(handleShowListing)
.put(isLoggedIn, isOwner, validateListing, wrapAsync(handleUpdateListing))
.delete(isLoggedIn, isOwner, wrapAsync(handleDeleteListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(handleEditListing));



router.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { err: { message, statusCode } });
});

module.exports = router;