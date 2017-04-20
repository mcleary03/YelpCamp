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

middlewareOBJ.


module.exports = middlewareOBJ