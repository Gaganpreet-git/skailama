const express = require("express");
const { auth } = require("../middlewares");
const { projectController } = require("../controllers");

const router = express.Router();

router.post("/", auth, projectController.createProject);
router.get("/", auth, projectController.getAllProjects);

module.exports = router;
