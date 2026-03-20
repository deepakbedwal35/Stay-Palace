const express = require('express');
const router = express.Router();

const upload = require("../middleware/multer")
// image uploading


const {index ,
    renderNewListing ,
    handleShowListing,
    handleCreateListing , 
    handleUpdateListing,
    renderEditListing,
    handleDeleteListing
     } = require("../controllers/listing")
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { validateListing , isLoggedIn , isOwner } = require("../middleware");

router
.route("/")
.get(wrapAsync(index))
// .post(isLoggedIn, validateListing, wrapAsync(handleCreateListing))
.post(upload.single("listing[image]"), wrapAsync(handleCreateListing))

 
router.get("/new"  , renderNewListing);

router
.route("/:id")
.get(handleShowListing)
.put(isLoggedIn, isOwner,  upload.single("listing[image]") , validateListing, wrapAsync(handleUpdateListing))
.delete(isLoggedIn, isOwner, wrapAsync(handleDeleteListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditListing));



router.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { err: { message, statusCode } });
});

module.exports = router;