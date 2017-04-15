var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
    
seedDB()

// Creates the yelp_camp DB if not already there
mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")


Campground.create(
    // {
    //     name: "Granite Hill", 
    //     image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg",
    //     description: "This is a huge granite hill, no bathrooms.  No water.  Beautiful granite!"
    // }, (err, campground) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("NEWLY CREATED CAMPGROUND: ")
    //         console.log(campground)
    //     }
    // }
)

app.get("/", (req, res) => {
    res.render("landing")
})

// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err)
        } else {
                res.render("index", { campgrounds })
        }
    })
})

// CREATE - add new campground to DB
app.post("/campgrounds", (req, res) => {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = { name, image, description }
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            // Redirect back to campgrounds page
            res.redirect("/campgrounds")
        }
    })
})

// NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs")
})

// SHOW - show details about one campground
// *** THIS MUST BE AFTER OTHER /CAMPGROUNDS ROUTES!!!
app.get("/campgrounds/:id", (req, res) => {
    // this takes two arguments, the id and callback
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("show", {campground})
        }
    })
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!")
})