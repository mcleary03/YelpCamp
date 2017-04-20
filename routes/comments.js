var express = require("express")
// mergeParams allows us to pass the campground id to the comments
var router  = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")

// New Route
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground })
        }
    })
})

// Create Route
router.post("/", middleware.isLoggedIn, (req, res) => {
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

// Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment })
        }
    })
})

// Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})


module.exports = router