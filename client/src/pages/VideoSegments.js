import React from "react";
import { useEffect, useState } from "react";
import VideoSegmentCard from "../components/video-card-segment";
export default function Videosegments() {
  const [videosegments, setVideosegments] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        "http://localhost:4000/api/video/videosegment",
        {
          method: "GET",
          "Content-Type": "application/json",
        }
      );
      const jsonResponse = await response.json();
      if (response.ok) {
        setVideosegments(jsonResponse);
      }
    };

    fetchVideos();
  });

  return (
    <div className="home">
      <div className="videos">
        {videosegments &&
          videosegments.map((videosegment) => {
            return (
              <VideoSegmentCard
                key={videosegment._id}
                videosegment={videosegment}
              />
            );
          })}
      </div>
    </div>
  );
}
