const express = require("express");
const { authController, podcastController } = require("../controllers");
const router = express.Router();
const podcastRoutes = require("./podcast.routes");
const projectRoutes = require("./project.routes");
const { auth } = require("../middlewares");

// auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// podcast routes
router.use("/podcast", podcastRoutes);
router.get("/podcasts/:projectId", auth, podcastController.getAllPodcasts);

// project routes
router.use("/project", projectRoutes);

module.exports = router