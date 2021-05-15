const router = require("express").Router(),
    userController = require("../controllers/usersController");

router.get("/users/:id/follow", userController.follow, userController.respondJSON);
router.get("/users/:id/unfollow", userController.unfollow, userController.respondJSON);
router.use(userController.errorJSON);

module.exports = router;