"use strict";

const Post = require("../models/post");

module.exports = {
    showAboutPage: (req, res) => {
        res.render("about");
    },
    showHome: (req, res) => {
        res.render("home");
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
        ], function (err, trendingHashtags) {
            trendingHashtags.sort((a, b) => (a.count < b.count) ? 1 : -1);
            //console.log(trendingHashtags);
            res.locals.trending = trendingHashtags;
            next();
        });
    }
};