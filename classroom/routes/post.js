const express = require("express");
const router = express.Router();



//Posts
// Index 
router.get("/", (req,res)=>{
    res.send("Get for post")
})

// Show
router.get("/:id", (req,res)=>{
    res.send("Get for post Id")
})

//post  
router.post("/", (req,res)=>{
    res.send("post  for posts")
})

//Delete
router.delete("/:id", (req,res)=>{
    res.send("Delete for post id")
})

module.exports =router;
