"use strict";

module.exports = {
    showLogin: (req, res) => {
        res.render("login");
    },
    showSignup: (req, res) => {
        res.render("signup");
    },
    showHome: (req, res) => {
        res.render("home");
    }
};