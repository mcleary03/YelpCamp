var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm8.staticflickr.com/7703/18103628621_dfc0582686.jpg",
        description: "Chuck Norris has two speeds. Walk, and Kill. When the Statue of Liberty was brought to America by the French, Chuck Norris didn't like the color. He stared at it and said, 'Green'. Look at it now, Chuck Norris doesn't die. Death Chuck Norrisses, Crop circles are Chuck Norris' way of telling the world that sometimes corn needs to lie down. Chuck Norris invented Kentucky Fried Chicken's famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear. When Chuck Norris sends in his taxes, he sends blank forms and includes only a picture of himself, crouched and ready to attack. Chuck Norris has not had to pay taxes, ever Chuck Norris can slam a revolving door Only Chuck Norris knows the true end of the movie Inception Police label anyone attacking Chuck Norris as a Code 45-11... a suicide."
    },  
    {
        name: "Twin Peaks", 
        image: "https://farm6.staticflickr.com/5565/14963435455_9ac7e57cd4.jpg",
        description: "Chuck Norris uses pepper spray to spice up his steaks Chuck Norris does not get frostbite. Chuck Norris bites frost Not even Google can find Chuck Norris. Chuck was shot today. Tomorrow is the bullet's funeral, Crop circles are Chuck Norris' way of telling the world that sometimes corn needs to lie down When Chuck Norris sends in his taxes, he sends blank forms and includes only a picture of himself, crouched and ready to attack. Chuck Norris has not had to pay taxes, ever Chuck Norris is ten feet tall, weighs two-tons, breathes fire, and could eat a hammer and take a shotgun blast standing, Chuck Norris doesn't go hunting... CHUCK NORRIS GOES KILLING Chuck Norris once won a Scrabble tournament despite getting only Z's and Q's in his rack. Chuck Norris is the reason why Waldo is hiding."
    },  
    {
        name: "Misty Ridge", 
        image: "https://farm8.staticflickr.com/7405/9318579224_51b9d84c3f.jpg",
        description: "Remember the Soviet Union? They decided to quit after watching a DeltaForce marathon on Satellite TV. Chuck Norris doesn't wear a watch. HE decides what time it is Chuck Norris doesn't read books. He stares them down until he gets the information he wants Chuck Norris is the Alpha, Omega and everything in between Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris doesn't wash his clothes, he disembowels them."
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