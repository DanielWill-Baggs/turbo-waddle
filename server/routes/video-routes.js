const express = require("express");
const router = express.Router();
const {
  postVideoEntry,
  getAllVideos,
} = require("../controllers/video-controller");

// Routes

// GET method to return all videos in the DB
router.get("/", getAllVideos);

// POST method to write to the DB a Video instance
router.post("/", postVideoEntry);

module.exports = router;
