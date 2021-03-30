"use strict";

const User = require("../models/user");

module.exports = {
    create: (req, res, next) => {
        let newUser = new User({
            name: {
                first: req.body.txtFirstName,
                last: req.body.txtLastName
            },
            username: req.body.txtUserName,
            email: req.body.txtEmail,
            location: req.body.txtLocation,
            password: req.body.txtPassword,
            gender: req.body.gender,
            DOB: req.body.txtDOB,
            securityQuestion: req.body.ddSecurityQuestion,
            securityQuestionAnswer: req.body.txtAnswer,
            bio: req.body.txtBio
        });
        User.create(newUser)
        .then(user => {
            res.locals.redirect = "/home";
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error saving user: ${error.message}`);
            next(error);
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    }
}