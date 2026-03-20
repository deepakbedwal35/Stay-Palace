const express = require('express');
require("dotenv").config();
// express session
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 8000;
// Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user'); 


const path = require("path");
const methodOverride = require("method-override");
const ListingRouter = require('./routes/listing');
const ReviewRouter = require('./routes/review');
const UserRouter = require('./routes/user');



// Create Session Middleware
const sessionOptions={
  secret:"mySecretKey",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 1000*60*60*24*7, // 1 week
    maxAge:1000*60*60*24*7, // 1 week
    httpOnly:true,
  }
};





// MongoDB connection
const { connectMongo } = require('./connectMongo');
connectMongo('mongodb://localhost:27017/staypalace');

// EJS + ejs-mate setup
const ejsMate = require("ejs-mate");
const { maxHeaderSize } = require('http');
app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));  // FIX: parse form body data
app.use(express.json());
app.use(methodOverride("_method"));               // FIX: support PUT/DELETE via forms
app.use(express.static(path.join(__dirname, "public"))); // FIX: serve CSS/JS files
app.use(require("cors")());

app.use(session(sessionOptions));
app.use(flash());

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// flash middleware - make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error'); 
  next();
});
// Routes

app.use('/listings', ListingRouter);
app.use('/listings', ReviewRouter);
app.use('/users' , UserRouter);

// 404 handler - must come after all other routes if no route exists
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, `Page Not Found: `));
// });

// Global error handler
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).render("error.ejs", { err: { message, statusCode } });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


