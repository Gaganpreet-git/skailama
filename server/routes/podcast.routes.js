const express = require("express");
const { auth } = require("../middlewares");
const { podcastController } = require("../controllers");

const router = express.Router();

router.get("/:id", auth, podcastController.getPodcast);
router.post("/", auth, podcastController.createPodcast);
router.patch("/:id", auth, podcastController.updatePodcast);
router.delete("/:id", auth, podcastController.deletePodcast);

module.exports = router;