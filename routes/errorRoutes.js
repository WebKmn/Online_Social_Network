const router = require("express").Router(),
    errorController = require("../controllers/errorController");

router.use(errorController.internalServerError);
router.use(errorController.pageNotFoundError);

module.exports = router;

