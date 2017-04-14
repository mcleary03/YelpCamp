var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

// Creates the yelp_camp DB if not already there
mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

// Compile schema into a model that has methods(create, find, etc.)
var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg"
//     }, (err, campground) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ")
//             console.log(campground)
//         }
//     }
// )

app.get("/", (req, res) => {
    res.render("landing")
})

app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err)
        } else {
                res.render("campgrounds", { campgrounds })
        }
    })
})

app.post("/campgrounds", (req, res) => {
    var name = req.body.name
    var image = req.body.image
    var newCampground = { name, image }
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

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs")
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!")
})