var express = require("express")
var router  = express.Router()
var Campground = require("../models/campground")

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds })
        }
    })
})

// CREATE - add new campground to DB
router.post("/", (req, res) => {
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
            res.redirect("/")
        }
    })
})

// NEW - show form to create new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new")
})

// SHOW - show details about one campground
// *** THIS MUST BE AFTER OTHER /CAMPGROUNDS ROUTES!!!
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground})
        }
    })
})

module.exports = router