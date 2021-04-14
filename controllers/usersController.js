"use strict";

const passport = require("passport");

const User = require("../models/user"),
    getUserParams = body => {
        return {
            name: {
                first: body.firstName,
                last: body.lastName
            },
            username: body.username,
            email: body.email,
            location: body.location,
            password: body.password,
            gender: body.gender,
            DOB: body.DOB,
            securityQuestion: body.securityQuestion,
            securityQuestionAnswer: body.securityQuestionAnswer,
            bio: body.bio
        };
    };


module.exports = {
    login: (req, res) => {
        res.render("./users/login");
    },
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next()
            })
            .catch(error => {
                console.log(`Error feting user data: ${error.message}`);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("./users/index");
    },
    new: (req, res) => {
        res.render("./users/new");
    },
    create: (req, res, next) => {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.username || !req.body.password
            || !req.body.confirmPass || !req.body.DOB || !req.body.securityQuestionAnswer) {
            req.flash("error", "One or more required field(s) is missing.");
            res.render("./users/new");
        }
        else if (req.body.password != req.body.confirmPass) {
            req.flash("error", "Passwords don't match.");
            res.render("./users/new");
        }
        else {
            if (req.skip) return next();

            let userParams = getUserParams(req.body);
            let newUser = new User(userParams);

            User.register(newUser, req.body.password, (error, user) => {
                if (user) {
                    req.flash("success", "User account successfully created!");
                    res.locals.redirect = "/users";
                    next();
                }
                else {
                    req.flash("error", `Failed to create user account: ${error.message}`);
                    res.locals.redirect = "/users/new";
                    next();
                }
            });
        }
    },
    validate: (req, res, next) => {

        req.check("email", "Email is invalid").isEmail();
        req.check("password", "Password cannot be empty").notEmpty();

        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/new";
                next();
            }
            else{
                next();
            }
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Login failed! Check your email or password",
        successRedirect: "/home",
        successFlash: "Logged in!"
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You are logged out");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {

        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next()
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    showView: (req, res) => {
        res.render("./users/show");
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("./users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    update: (req, res, next) => {
        if(req.skip) return next();
        let userId = req.params.id;
        let userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, userParams)
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    }
}