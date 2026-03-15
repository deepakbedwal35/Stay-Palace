const express = require('express');
const app = express();
const port = 8000;
const path = require("path")
const ListingRouter = require('./routes/listing');
// MongoDB connection
const { connectMongo } = require('./connectMongo');
connectMongo('mongodb://localhost:27017/staypalace');

// ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Require Ejs mate
const ejsMate = require("ejs-mate")
app.engine("ejs" , ejsMate)

// routes
app.use('/', ListingRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
