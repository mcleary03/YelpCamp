var express = require("express")
var app = express()

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("landing")
})

app.get("/campgrounds", (req, res) => {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Granite Hill", image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    ]
    res.render("campgrounds", { campgrounds })
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!")
})