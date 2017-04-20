var express = require("express")
var router  = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")

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
router.post("/", middleware.isLoggedIn, (req, res) => {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name, image, description, author }
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

// SHOW - show details about one campground
// *** THIS MUST BE AFTER OTHER /CAMPGROUNDS ROUTES!!!
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", { campground })
        }
    })
})

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render("campgrounds/edit", { campground })
    })
})

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
})


module.exports = router