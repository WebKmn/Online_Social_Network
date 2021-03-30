"use strict";

module.exports = {
    showLogin: (req, res) => {
        res.render("login");
    },
    showHome: (req, res) => {
        res.render("home");
    }
};