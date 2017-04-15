var mongoose = require("mongoose")

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

// Compile schema into a model that has methods(create, find, etc.)
// var Campground = mongoose.model("Campground", campgroundSchema)

module.exports = mongoose.model("Campground", campgroundSchema)