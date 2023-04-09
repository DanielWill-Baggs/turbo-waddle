// src/VideoCapture.js
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const SEGMENT_DURATION = 3000; // 3 seconds

const VideoCapture = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [uploadedSegments, setUploadedSegments] = useState([]);

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
    mediaRecorderRef.current.start(SEGMENT_DURATION);
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(e.data));
    }
  };

  const handleStopCaptureClick = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  };

  const saveSegment = async (segmentBlob, index) => {
    try {
      const handle = await window.showDirectoryPicker();
      const fileHandle = await handle.getFileHandle(`segment_${index}.webm`, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(segmentBlob);
      await writable.close();
      console.log("Segment saved:", `segment_${index}.webm`);
    } catch (err) {
      console.error("Failed to save segment:", err);
    }
  };

  useEffect(() => {
    if (!capturing) {
      return;
    }

    const interval = setInterval(() => {
      if (recordedChunks.length > 0) {
        const segment = recordedChunks.shift();
        const index = uploadedSegments.length;
        console.log("this is the segment" + segment);
        console.log("this is the uploaded" + uploadedSegments);
        setUploadedSegments((prev) => prev.concat(segment));
        saveSegment(segment, index);
      }
    }, SEGMENT_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [capturing, recordedChunks, uploadedSegments]);

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
