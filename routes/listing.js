const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Create a new listing

router.get("/listings" , async (req,res)=>{
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("index" , {allListings});
});

// create new
router.get("/listings/new",(req,res)=>{
  res.render("new.ejs")
})
// create and add new listings
router.get("/listings/:id" ,async (req ,res)=>{
   let {id} = req.params
  let listing = await Listing.findById(id)
  res.render("show.ejs" ,{listing})

})


router.post("/listings" ,(async(req ,res ,err)=>{
  // {title}

  
     let newListing= req.body
console.log(newListing)
    
  
  await Listing.insertOne(newListing)
  res.redirect("/listings")

 
   
  }
 

))
router.put("/listings/:id" ,async(req,res)=>{
  let {id} = req.params
  let editListing = req.body
  let listing = await Listing.findByIdAndUpdate(id , editListing , {new:true})
  // console.log(editListing)
  console.log(listing)
  res.redirect("/listings")
  

})


// Delete Route
router.delete("/listings/:id" ,(async (req,res)=>{
  let {id} = req.params
  let DeletedListing = await Listing.findByIdAndDelete(id)
  console.log(DeletedListing)
  res.redirect("/listings")
  // res.send("Succesful Deleted")
  
}))

module.exports = router;