var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("landing")
})

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
]

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds })
})

app.post("/campgrounds", (req, res) => {
    var name = req.body.name
    var image = req.body.image
    var newCampground = { name, image }
    campgrounds.push(newCampground)
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs")
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!")
})