var mongoose = require("mongoose")

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
})

// Compile schema into a model that has methods(create, find, etc.)
// var Campground = mongoose.model("Campground", campgroundSchema)

module.exports = mongoose.model("Campground", campgroundSchema)