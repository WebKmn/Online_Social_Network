const router = require("express").Router(),
    postsController = require("../controllers/postsController");

router.post("/posts/create", postsController.create, postsController.redirectView);
router.delete("/posts/:id/delete", postsController.delete, postsController.redirectView);

module.exports = router;