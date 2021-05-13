const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    postSchema = new Schema({
        text: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        hashtags: {
            type: [String]
        },
        creator: { type: Schema.Types.ObjectId, ref: "User" }
    },
        {
            timestamps: true
        }
    );


module.exports = mongoose.model("Post", postSchema);