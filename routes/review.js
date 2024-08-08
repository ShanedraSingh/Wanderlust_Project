const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const{ listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../views/middleware.js")

const reviewController = require("../controllers/reviews.js")

//Post Review Route
  //Post Route
router.post("/", 
    isLoggedIn, 
    validateReview,wrapAsync( reviewController.createReview
  )
);

//    done  yes good job  ok bye bye 
 
 
 //   Delete Review Route
router.delete("/:reviewsId", 
              isLoggedIn,
              isReviewAuthor,
 wrapAsync(reviewController.destroyReview)
 );

 module.exports =router;
 