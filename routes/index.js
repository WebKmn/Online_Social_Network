const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    postRoutes = require("./postRoutes"),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/", homeRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/api", apiRoutes);
router.use("/", errorRoutes);

module.exports = router;