if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}



// console.log(process.env.SECRET); 






const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');


const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");




const googleRoute = require("./routes/google.js");
const facebookRoute = require("./routes/facebook.js");




const { required } = require("joi");
// const{ listingSchema , reviewSchema} = require("./schema.js");
const { error } = require("console");
const Review = require("./models/review.js");
const { Route } = require("express");
// const { measureMemory } = require("vm");

const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const reviewRouter = require("./routes/review.js")






//create database
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const  dbURL = process.env.ATLASDB_URL;

main()
  .then(() =>{
    console.log("connected to DB")
  })
   .catch((err) =>{
    console.log(err);
   });



async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbURL);
}

// Creat engine--------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET,
       },
       touchAfter: 24 * 3600,

})

store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE", error);
})


// session Expression
   const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
    };







// create basic API 
// app.get("/", (req, res) =>{
//     res.send("Hi, I am root");
// });


app.use(session(sessionOptions));
app.use(flash());
    

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;



    // console.log(res.locals.success);
    
    next();
})

// Demo User
// app.get("/demouser", async (req, res)=>{
//     let fakeUser = new User({
//         email: "sachin@gmail.com",
//         username: "Sachin Thakur"
//     });

//    let registeredUser = await User.register(fakeUser, "helloworld");
//    res.send(registeredUser);
// });


app.use("/auth/google", googleRoute);
app.use("/auth/facebook", facebookRoute);

app.use("/listings/", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter);






// Use CURD opration ________________
 // Read Opration  for


app.all("*", (req, res, next) => {
   next(new ExpressError(404, "Page Not Found!"));

});






//Error handling vs middleware

app.use((err, req, res, next) =>{
   let {statusCode=500, message="Somthing went wrong!"} = err;
         res.status(statusCode).render("listings/error.ejs", {message})

         
         
   // res.render("listings/error.ejs", {err})
   // res.status(statusCode).send(message);
   // res.send("something went wrong!");
});



// Server start 
app.listen(8080, () =>{
    console.log("server is listening to port 8080");
});
