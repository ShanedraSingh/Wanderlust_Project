const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.createReview = async (req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author =req.user._id; 
    // console.log(newReview);
 
    listing.review.push(newReview);
 
      await newReview.save();
      await listing.save();
 
      req.flash("success", "new review has been created!");
      res.redirect(`/listings/${listing._id}`); 
 
    //   console.log("New Review Saved");
    //   res.send("New Review Saved");
   }


   module.exports.destroyReview = async (req, res) => {
 
    let {id, reviewsId} = req.params;
    console.log(id,reviewsId);
 
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewsId}})
    await Review.findByIdAndDelete(reviewsId);
 
    req.flash("success", "review has been deleted!");
    res.redirect(`/listings/${id}`);
 }