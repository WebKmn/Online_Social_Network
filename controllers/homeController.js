"use strict";

module.exports = {
    showLogin: (req, res) => {
        res.render("./users/login");
    },
    showHome: (req, res) => {
        res.render("home");
    }
};