const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  postVideoEntry,
  getAllVideos,
  getAllVideoSegments,
  postVideoSegment,
} = require("../controllers/video-controller");
const upload = multer({ dest: "uploads/" });

// Routes

// GET method to return all videos in the DB
router.get("/", getAllVideos);

// POST method to write to the DB a Video instance
router.post("/", postVideoEntry);

// GET method to return all Video Segments in the DB
router.get("/videosegment", getAllVideoSegments);

// POST method to write to the DB a Video Segment
router.post("/videosegment", upload.single("video"), postVideoSegment);

module.exports = router;
