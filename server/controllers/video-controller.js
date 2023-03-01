const Video = require("../models/video-model");

// GET all Videos
const getAllVideos = async (req, res) => {
  // GET all documents with zero params, sort them in desc order
  const videos = await Video.find({}).sort({ createdAt: -1 });
  res.status(200).json(videos);
};

// POST a New Video Entry
const postVideoEntry = async (req, res) => {
  const title = req.body;
  console.log(title);
  try {
    const video = await Video.create(title);
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { postVideoEntry, getAllVideos };
