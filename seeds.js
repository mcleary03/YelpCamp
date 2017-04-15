var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3659/3662521481_4a7bcce691.jpg",
        description: "blah, blah, blah"
    },  
    {
        name: "Twin Peaks", 
        image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
        description: "blah, blah, blah"
    },  
    {
        name: "Misty Ridge", 
        image: "https://farm2.staticflickr.com/1179/1051152631_f8b4ae0a33.jpg",
        description: "blah, blah, blah"
    },  
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) console.log(err)
        console.log("Removed Campgrounds!")
        // Add a few campgrounds
        // *** MUST BE INSIDE REMOVE CALLBACK OR REMOVE MAY HAPPEN AFTER! ***
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a campground")
                    // Add a few comments
                    Comment.create(
                        {
                            text: "Internet would be nice...",
                            author: "Mike"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err)
                            } else {
                                campground.comments.push(comment)
                                campground.save()
                                console.log("Created new comment")
                            }
                        }
                    )
                }
            })
        })
    })
}

module.exports = seedDB