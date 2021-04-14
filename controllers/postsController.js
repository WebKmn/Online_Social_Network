"use strict";

const post = require("../models/post");
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
        let newPost = new Post({
            text: req.body.text,
            username: req.body.username,
            fullName: req.body.fullName,
            creator: req.body.creator
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