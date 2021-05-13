"use strict";

const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        Post.find()
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {
                console.log(`Error feting posts: ${error.message}`);
                next(error);
            })
    },
    create: (req, res, next) => {
        let regex = /(#[a-z\d-]+)/ig;
        let postText = req.body.text;

        let hashtags = postText.match(regex);
        if (hashtags) {
            //to lowercase
            hashtags = hashtags.map(hashtag => hashtag.toLowerCase())
            //get rid of hashtag
            hashtags = hashtags.map(hashtag => hashtag.slice(1));
            //get rid of duplicates
            hashtags = [...new Set(hashtags)];
        }


        //add class for css styling
        postText = postText.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hashtag'>$2</span>");

        let newPost = new Post({
            text: postText,
            username: req.body.username,
            fullName: req.body.fullName,
            creator: req.body.creator,
            hashtags: hashtags
        });
        Post.create(newPost)
            .then(post => {
                User.findById(post.creator)
                    .then(user => {
                        user.numberOfPosts += 1;
                        user.save();
                    })
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error saving post: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let postId = req.params.id;
        Post.findByIdAndRemove(postId)
            .then(post => {
                User.findById(post.creator)
                    .then(user => {
                        user.numberOfPosts -= 1;
                        user.save();
                    })
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }
}