const router = require("express").Router(),
    postsController = require("../controllers/postsController");

router.post("/create", postsController.create, postsController.redirectView);
router.delete("/:id/delete", postsController.delete, postsController.redirectView);

module.exports = router;