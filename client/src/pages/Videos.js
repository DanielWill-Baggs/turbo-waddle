import React from "react";
import { useEffect, useState } from "react";
import VideoCard from "../components/video-card";
export default function Videos() {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("http://localhost:4000/api/video", {
        method: "GET",
        "Content-Type": "application/json",
      });
      const jsonResponse = await response.json();
      if (response.ok) {
        setVideos(jsonResponse);
      }
    };

    fetchVideos();
  });

  return (
    <div className="home">
      <div className="videos">
        {videos &&
          videos.map((video) => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </div>
    </div>
  );
}
