const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    Post = require("./post"),
    userSchema = new Schema({
        name: {
            first: {
                type: String,
                required: true,
                trim: true
            },
            last: {
                type: String,
                required: true,
                trim: true
            }
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        location: {
            type: String
        },
        gender: {
            type: String
        },
        DOB: {
            type: Date,
            required: true
        },
        securityQuestion: {
            type: String,
            required: true
        },
        securityQuestionAnswer: {
            type: String,
            required: true
        },
        bio: {
            type: String
        },
        numberOfPosts: {
            type: Number,
            default: 0
        },
        following: [{ type: Schema.Types.ObjectId, ref: "User" }],
        haveSeen: [{ type: Schema.Types.ObjectId, ref: "Post" }]
    },
        {
            timestamps: true,
            toJSON: { virtuals: true }, 
            toObject: { virtuals: true }
        }
    )

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});


userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);