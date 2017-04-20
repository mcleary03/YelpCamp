var express = require("express")
// router is used to replace the `app` var on this page and 
//  connect all of this to the app.js file
var router  = express.Router()
var passport = require("passport")
var User = require("../models/user")

// Root Route
router.get("/", (req, res) => {
    res.render("landing")
})

// Register Form Show
router.get("/register", (req, res) => {
    res.render("register")
})

// handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User( { username: req.body.username } )
    // this is provided by passport-local-mongoose
    // we register user, if successful, logs them in
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds")
        })
    })
})

// Login Show
router.get("/login", (req, res) => {
    res.render("login")
})

// handle login logic
// router.post(route, middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
    
})

// Logout Route
router.get("/logout", (req, res) => {
    req.logout()
    req.flash("success", "You are logged out")
    res.redirect("/campgrounds")
})


module.exports = router