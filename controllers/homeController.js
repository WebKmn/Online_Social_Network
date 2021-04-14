"use strict";

module.exports = {
    showAboutPage: (req, res) => {
        res.render("about");
    },
    showHome: (req, res) => {
        res.render("home");
    }
};