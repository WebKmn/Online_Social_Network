const router = require("express").Router(),
    usersController = require("../controllers/usersController"),
    postsController = require("../controllers/postsController"),
    homeController = require("../controllers/homeController");

router.get("/", homeController.showAboutPage);
router.get("/about", homeController.showAboutPage);

router.get("/home", postsController.index, usersController.index, homeController.getTrendingHashtags, homeController.showHome, homeController.redirectView);


module.exports = router;