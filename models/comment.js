var mongoose = require("mongoose")

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        // because this is a non-relational database,
        //  we can store the data here inside the comment
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("Comment", commentSchema)