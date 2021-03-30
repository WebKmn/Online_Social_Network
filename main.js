"use strict";

const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    homeController = require("./controllers/homeController"),
    usersController = require("./controllers/usersController"),
    errorController = require("./controllers/errorController");

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
router.use(express.json());

router.get("/", homeController.showLogin);

router.get("/signup", homeController.showSignup);
router.post("/signup", usersController.create, usersController.redirectView);

router.get("/home", homeController.showHome);
router.get("/login", homeController.showLogin);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
})