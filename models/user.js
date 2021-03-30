"use strict";

const mongoose = require("mongoose"),
    userSchema = new mongoose.Schema({
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
            required: true,
            trim: true
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
        password: {
            type: String,
            required: true
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

module.exports = mongoose.model("User", userSchema);