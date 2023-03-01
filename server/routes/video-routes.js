const express = require("express");
const Video = require("../models/video-model");
const router = express.Router();

// Routes

// GET method to return all videos in the DB
router.get("/", (req, res) => {
  res.json({ mssg: "GET all videos" });
});

// POST method to write to the DB a Video instance
router.post("/", async (req, res) => {
  const title = req.body;
  console.log(title);
  try {
    const video = await Video.create(title);
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
