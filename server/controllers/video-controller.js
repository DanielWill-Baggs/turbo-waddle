const Video = require("../models/video-model");
const SegmentedVideo = require("../models/videosegment-model");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

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

const getAllVideoSegments = async (req, res) => {
  const videosegments = await SegmentedVideo.find({}).sort({ createdAt: -1 });
  res.status(200).json(videosegments);
};

// USE THIS TO NOT SEND OVER ANYTHING AND TO STORE THE SEGMENTS LOCALLY
// const postVideoSegment = async (req, res) => {
//   try {
//     const videoFile = req.file;
//     const videoPath = videoFile.path;

//     // Set up a path to save the segmented videos
//     const outputDirectory = "segmented_videos/";
//     if (!fs.existsSync(outputDirectory)) {
//       fs.mkdirSync(outputDirectory);
//     }

//     // Configure ffmpeg to segment the video
//     ffmpeg(videoPath)
//       .outputOptions("-c:v libx264")
//       .outputOptions("-f segment")
//       .outputOptions("-segment_time 3")
//       .outputOptions("-reset_timestamps 1")
//       .output(`${outputDirectory}segment_%03d.mp4`)
//       .on("end", () => {
//         console.log("Video segmentation completed");
//         fs.unlinkSync(videoPath); // Delete the original uploaded file
//         res.status(200).json({ message: "Video segmented successfully" });
//       })
//       .on("error", (err) => {
//         console.error("Error during video segmentation:", err);
//         res.status(500).json({ error: "Video segmentation failed" });
//       })
//       .run();
//   } catch (err) {
//     console.error("Failed to process video:", err);
//     res.status(400).json({ error: err.message });
//   }
// };

const postVideoSegment = async (req, res) => {
  try {
    const videoFile = req.file;
    const videoPath = videoFile.path;

    // Set up a path to save the segmented videos
    const outputDirectory = "segmented_videos/";
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    // Configure ffmpeg to segment the video
    ffmpeg(videoPath)
      .outputOptions("-c:v libx264")
      .outputOptions("-f segment")
      .outputOptions("-segment_time 3")
      .outputOptions("-reset_timestamps 1")
      .output(`${outputDirectory}segment_%03d.mp4`)
      .on("end", async () => {
        console.log("Video segmentation completed");
        fs.unlinkSync(videoPath); // Delete the original uploaded file

        // Read segmented video files and save them to the database
        const segmentedFiles = fs.readdirSync(outputDirectory);
        const segmentedVideoPromises = segmentedFiles.map(async (file) => {
          const filePath = `${outputDirectory}${file}`;
          const fileData = fs.readFileSync(filePath);

          const segmentedVideo = new SegmentedVideo({
            filename: file,
            data: fileData,
          });

          await segmentedVideo.save();
          fs.unlinkSync(filePath); // Delete the segmented file after it's saved to the database
        });

        await Promise.all(segmentedVideoPromises);
        res
          .status(200)
          .json({ message: "Video segmented and saved successfully" });
      })
      .on("error", (err) => {
        console.error("Error during video segmentation:", err);
        res.status(500).json({ error: "Video segmentation failed" });
      })
      .run();
  } catch (err) {
    console.error("Failed to process video:", err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  postVideoEntry,
  getAllVideos,
  postVideoSegment,
  getAllVideoSegments,
};
