"use strict";

const express = require("express"),
    app = express(),
    router = express.Router(),
    homeController = require("./controllers/homeController"),
    usersController = require("./controllers/usersController"),
    errorController = require("./controllers/errorController"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user"),
    layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
const postsController = require("./controllers/postsController");
mongoose.connect("mongodb://localhost:27017/ponyo_db",
    { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
)
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));

router.use(express.json());
router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

router.use(expressValidator());

router.get("/", homeController.showAboutPage);
router.get("/about", homeController.showAboutPage);

router.get("/home", postsController.index, usersController.index, homeController.getTrendingHashtags, homeController.showHome);

router.post("/posts/create", postsController.create, postsController.redirectView);
router.delete("/posts/:id/delete", postsController.delete, postsController.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.validate, usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
})