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
router.post("/", isLoggedIn, (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {
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
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render("campgrounds/edit", { campground })
    })
})

// UPDATE ROUTE
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// DESTROY ROUTE
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
})

// middleware to prevent users access to routes that require login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkCampgroundOwnership(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                res.redirect("/campgrounds")
            } else {      
                // does the user own the campground?
                // .equals is built in to mongoose
                //  cannot use === between object and string
                if (campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    // take user to previous page
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

module.exports = router