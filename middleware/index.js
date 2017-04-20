var Campground = require("../models/campground")
var Comment = require("../models/comment")

// All Middleware Goes Here
var middlewareOBJ = {}

middlewareOBJ.checkCampgroundOwnership = (req, res, next) => {
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


middlewareOBJ.checkCommentOwnership = (req, res, next) => {
    // is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err) {
                res.redirect("/campgrounds")
            } else {      
                // does the user own the comment?
                // `.equals` is built in to mongoose
                //  cannot use === between object and string
                if (comment.author.id.equals(req.user._id)) {
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

middlewareOBJ.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error", "Please Login First!")
    res.redirect("/login")
}


module.exports = middlewareOBJ