const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")
const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    url : String ,
    filename : String
    // type: String,
    // default:
    //   "https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?s=612x612&w=0&k=20&c=Ek2P0DQ9nHQero4m9mdDyCVMVq3TLnXigxNPcZbgX2E=",
    // set: (v) =>
    //   v === ""
    //     ? "https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?s=612x612&w=0&k=20&c=Ek2P0DQ9nHQero4m9mdDyCVMVq3TLnXigxNPcZbgX2E="
    //     : v
      
  },
  price:{
    type : Number,
      // set: (v) => Number(v)
    
    },
  location: String,
  country: String ,
  reviews : [
    {
      type : Schema.Types.ObjectId, 
      ref :"Review"
    }
  ] ,
  owner: {                     // ⭐ ADD THIS
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({
      _id: {
        $in: listing.reviews
      }
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
