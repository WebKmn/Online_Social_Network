const router = require("express").Router(),
    postsController = require("../controllers/postsController");

router.post("/create", postsController.create, postsController.redirectView);
router.get("/notifications", postsController.index, postsController.notifications);
router.delete("/:id/delete", postsController.delete, postsController.redirectView);


module.exports = router;