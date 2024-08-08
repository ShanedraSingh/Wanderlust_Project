const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
}


module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs")
};


module.exports.showListing =async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "review", 
            populate: {
                path: "author",
            },
        })
        .populate("owner");
     console.log(listing)

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    // let originalImageUrl  = listing.image.url;
    // originalImageUrl  = originalImageUrl.replace("/upload", "/uload/h_300,w_200")



    console.log("listing");
    res.render("listings/show.ejs", { listing, });
    // res.render("listings/show.ejs", { listing, originalImageUrl  });
};


module.exports.createListing = async (req, res, next) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })

        .send()

        // console.log(response.body.features[0].geometry);
        // res.send("Done!");
        

    let url = req.file.path;
    let filename = req.file.filename;

   

    // console.log(url, "..", filename);




    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image={url, filename};

    newListing.geometry= response.body.features[0].geometry;

    let savedListing =  await newListing.save();
    console.log(savedListing);

    req.flash("success", "new listing has been created!");
    res.redirect("/listings");

 };


 module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    //    let listing = await Listing.findById(id);

    //    if(!listing.owner.equals(res.locals.currUser._id)){
    //     req.flash("error", "You don't have permission to edit")
    //     return res.redirect(`/listings/${id}`);
    //    }


    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

 
    if(typeof  req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};  
    await listing.save();  
}

    

    req.flash("success", "listing has been updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing =async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "listing has been deleted!");
    res.redirect("/listings");
};


// akash
module.exports.filter = async (req, res, next) => {
    let { id } = req.params;
    let allListings = await Listing.find({ category: { $all: [id] } });
    console.log(allListings);
    if (allListings.length != 0) {
      res.locals.success = `Listings Find by ${id}`;
      res.render("listings/index.ejs", { allListings });
    } else {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };
  
  module.exports.search = async (req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " "); // remove start and end space and middle space remove and middle add one space------
    console.log(input);
    if (input == "" || input == " ") {
      //search value empty
      req.flash("error", "Search value empty !!!");
      res.redirect("/listings");
    }
  
    // convert every word 1st latter capital and other small---------------
    let data = input.split("");
    let element = "";
    let flag = false;
    for (let index = 0; index < data.length; index++) {
      if (index == 0 || flag) {
        element = element + data[index].toUpperCase();
      } else {
        element = element + data[index].toLowerCase();
      }
      flag = data[index] == " ";
    }
    console.log(element);
  
    let allListings = await Listing.find({
      title: { $regex: element, $options: "i" },
    });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Title";
      res.render("listings/index.ejs", { allListings });
      return;
    }
    if (allListings.length == 0) {
      allListings = await Listing.find({
        category: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Category";
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    if (allListings.length == 0) {
      allListings = await Listing.find({
        country: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Country";
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    if (allListings.length == 0) {
      let allListings = await Listing.find({
        location: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Location";
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    const intValue = parseInt(element, 10); // 10 for decimal return - int ya NaN
    const intDec = Number.isInteger(intValue); // check intValue is Number & Not Number return - true ya false
  
    if (allListings.length == 0 && intDec) {
      allListings = await Listing.find({ price: { $lte: element } }).sort({
        price: 1,
      });
      if (allListings.length != 0) {
        res.locals.success = `Listings searched for less than Rs ${element}`;
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    if (allListings.length == 0) {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };
  