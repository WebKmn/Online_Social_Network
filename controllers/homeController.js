"use strict";

const Post = require("../models/post");

module.exports = {
    showAboutPage: (req, res) => {
        res.render("about");
    },
    getTrendingHashtags: (req, res, next) => {
        Post.aggregate([
            { $match: { /* Query can go here, if you want to filter results. */ } }
            , { $project: { hashtags: 1 } } /* select the hashtags field as something we want to "send" to the next command in the chain */
            , { $unwind: '$hashtags' } /* this converts arrays into unique documents for counting */
            , {
                $group: { /* execute 'grouping' */
                    _id: { hashtag: '$hashtags' } /* using the 'hashtag' value as the _id */
                    , count: { $sum: 1 } /* create a sum value */
                }
            }
        ]).then(trending => {
            trending.sort((a, b) => (a.count < b.count) ? 1 : -1);
            //console.log(trendingHashtags);
            res.locals.trending = trending;
            next();
        })
        .catch(error => {
            console.log(`Error feting trending hashtags data: ${error.message}`);
            next(error);
        })
    },
    showHome: (req, res, next) => {
        if(!res.locals.currentUser){
            res.locals.redirect = "/users/login";
            next();
        }
        res.render("home");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
};