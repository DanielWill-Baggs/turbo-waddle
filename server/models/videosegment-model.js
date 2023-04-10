const mongoose = require("mongoose");

// Add this schema for segmented videos
const segmentedVideoSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
});

// Add this model for segmented videos
module.exports = mongoose.model("SegmentedVideo", segmentedVideoSchema);
