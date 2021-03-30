"use strict";

const { render } = require("ejs");
const User = require("../models/user");

module.exports = {
    showLogin: (req, res) => {
        res.render("login");
    },
    showSignup: (req, res) => {
        res.render("signup");
    },
    create: (req, res, next) => {
        if (!req.body.txtFirstName || !req.body.txtLastName || !req.body.txtEmail || !req.body.txtUserName || !req.body.txtPassword
            || !req.body.txtConfirmPass || !req.body.txtDOB || !req.body.txtAnswer) {
            res.locals.signupErrorMessage = "One or more required field(s) is missing.";
            res.render("signup");
        }
        else if (req.body.txtPassword != req.body.txtConfirmPass) {
            res.locals.signupErrorMessage = "Passwords don't match.";
            res.render("signup");
        }
        else {
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
        }
    },
    login: (req, res, next) => {
        let userEmail = req.body.txtEmail,
            userPassword = req.body.txtPassword;
        User.findOne({ email: userEmail })
            .then(user => {
                if(!user) {
                    res.locals.loginErrorMessage = "Email not found.";
                    res.render("login");
                }
                else if (user.password != userPassword) {
                    res.locals.loginErrorMessage = "Wrong password. Please try again."
                    res.render("login");
                }
                else {
                    res.locals.redirect = "/home";
                    next();
                }
            })
            .catch(error => {
                console.log(`Error login in: ${error.message}`);
                next(error);
            })

    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }
}