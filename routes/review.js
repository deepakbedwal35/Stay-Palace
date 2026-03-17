const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
// JOi validation schema
// const { listingSchema } = require('./schema.js');
const ExpressError = require('../utils/ExpressError');
const {  validateReview , isLoggedIn , isOwner } = require("../middleware");
const { handleCreateReview, handleDeleteReview } = require('../controllers/review');



 

// review route
router.post("/:id/reviews",validateReview , isLoggedIn, handleCreateReview);

// Delete review
router.delete("/:id/reviews/:reviewId",isOwner , isLoggedIn , wrapAsync(handleDeleteReview));

router.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err: { message, statusCode } });
});


module.exports = router;
