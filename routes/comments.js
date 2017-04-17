var express = require("express")
// mergeParams allows us to pass the campground id to the comments
var router  = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground })
        }
    })
})

// Comments Create
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    // save comment
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
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

module.exports = router