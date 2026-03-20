const mongoose = require("mongoose")
mongoose.set('strictQuery' , true)

async function connectMongo(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB ");
  } catch (error) {
    console.error("MongoDB Connection Error ", error);
  }
}

module.exports = { connectMongo };