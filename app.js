var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds")
// Requiring Routes  
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index")
    

// Creates the yelp_camp DB env variable if not already there
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
//  DATABASEURL was made with shell command: `export DATABASEURL=mongodb://localhost/yelp_camp`
//    for develpment only
//  For production, Heroku config variable set to: `DATABASEURL : mongodb://mike:admin@ds157571.mlab.com:57571/yelp_camp`
mongoose.connect(url)

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
// tells app to look inside current directory for /public
app.use(express.static(__dirname + "/public"))
// telling methodOverride to look for "_method"
app.use(methodOverride("_method"))
// flash must be above passport configuration
app.use(flash())

// seedDB() //seed the DB

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

// Middleware to pass user info to routes
//  by using `app.use` this will be run automatically on ALL routes
app.use((req, res, next) => {
    //  Now all routes have access to `currentUser`
    res.locals.currentUser = req.user,
    //  Pass flash messages to all routes ( displayed in header )
    res.locals.error = req.flash('error') 
    res.locals.success = req.flash('success') 
    next()
})

// This sets "/campgrounds" to automatically be the beginning of 
//  routes in get and post requests, as well as use the route here
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use(indexRoutes)


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!")
})