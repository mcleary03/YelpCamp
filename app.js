var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds")
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")
    

// Creates the yelp_camp DB if not already there
mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
// tells app to look inside current directory for /public
app.use(express.static(__dirname + "/public"))
seedDB()

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is just random text to salt the hash with...",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// middleware to pass user info to routes
//  by using `app.use` this will be run automatically on all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

// this sets "/campgrounds" to automatically be the beginning of 
//  routes in get and post requests, as well as use the route here
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use(indexRoutes)


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!")
})