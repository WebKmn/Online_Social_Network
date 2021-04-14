"use strict";

const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),

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
    },
        {
            timestamps: true
        }
    );

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);