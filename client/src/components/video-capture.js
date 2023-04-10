// src/VideoCapture.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const VideoCapture = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = () => {
    setCapturing(true);

    let options = {};
    const mimeType = "video/webm;codecs=vp9,h.264";
    const mimeType2 = "video/webm;codecs=vp9";
    const mimeType3 = "video/webm;codecs=h.264";

    if (MediaRecorder.isTypeSupported(mimeType)) {
      options = { mimeType, videoBitsPerSecond: 5000000 };
    } else if (MediaRecorder.isTypeSupported(mimeType2)) {
      options = { mimeType: mimeType2, videoBitsPerSecond: 5000000 };
    } else if (MediaRecorder.isTypeSupported(mimeType3)) {
      options = { mimeType: mimeType3, videoBitsPerSecond: 5000000 };
    } else {
      console.error("No supported mimeType found");
      return;
    }

    mediaRecorderRef.current = new MediaRecorder(
      webcamRef.current.stream,
      options
    );
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(e.data));
    }
  };
  const handleStopCaptureClick = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    setRecordedChunks([]);

    try {
      console.log(blob);
      const formData = new FormData();
      formData.append("video", blob, "video.webm");

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(
        "http://localhost:4000/api/video/videosegment",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Video uploaded:", jsonResponse);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (err) {
      console.error("Failed to upload video:", err);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
      />
      <button
        onClick={capturing ? handleStopCaptureClick : handleStartCaptureClick}
      >
        {capturing ? "Stop Capture" : "Start Capture"}
      </button>
    </div>
  );
};

export default VideoCapture;
