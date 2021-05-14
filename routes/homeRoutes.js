const router = require("express").Router(),
    usersController = require("../controllers/usersController"),
    postsController = require("../controllers/postsController"),
    homeController = require("../controllers/homeController");

router.get("/about", homeController.showAboutPage);

router.get("/home", postsController.index, usersController.index, homeController.getTrendingHashtags, homeController.showHome);

router.get("/", homeController.showAboutPage);

module.exports = router;