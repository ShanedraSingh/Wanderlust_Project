const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validateListing } = require("../views/middleware.js")

const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../Cloud/cloudConfig.js");

const upload = multer({ storage })



router.get("/filter/:id", wrapAsync(listingController.filter));                              //Filter Route-----------------

router.get("/search", wrapAsync(listingController.search))                                  //SEARCH Route-------------


router
.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn, 
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);


// .post(upload.single('listing[image]'),(req,res )=>{
//     res.send(req.file);
// })

// Create: New Route ---------------------------------------
router.get("/new", isLoggedIn, listingController.renderNewForm);



router
   .route("/:id")
   .get(wrapAsync(listingController.showListing))
   .put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateListing)
   )
   .delete(isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));







// Create Index root---------------------------------
// router.get("/", wrapAsync(listingController.index)
// );



// Create: New Route ---------------------------------------
// router.get("/new", isLoggedIn, listingController.renderNewForm);


//   show Route
// router.get("/:id", wrapAsync(listingController.showListing));


// Create Route
// router.post("/", isLoggedIn, validateListing,wrapAsync(listingController.createListing));


//Edit route 
router.get("/edit/:id", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


// Update Route
// router.put("/:id",isLoggedIn,isOwner,wrapAsync(listingController.updateListing));


// Delete Route 
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;