import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import { useSelector } from "react-redux";
import "plyr/dist/plyr.css";

const HlsVideoPlayer = () => {
  const playerRef = useRef(null);
  const [quality, setQuality] = useState(720); // Default resolution
  const { currentVideo } = useSelector((state) => state.video);

  const videoSources = {
    240: `/transcode/${currentVideo.title}_output_240p.m3u8`,
    480: `/transcode/${currentVideo.title}_output_480p.m3u8`,
    720: `/transcode/${currentVideo.title}_output_720p.m3u8`,
  };

  useEffect(() => {
    const video = playerRef.current;

    // Initialize Plyr player
    const player = new Plyr(video, {
      controls: [
        "play-large",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "mute",
        "volume",
        "airplay",
        "fullscreen",
      ],
    });

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSources[quality]);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      // Clean up when the component is unmounted or quality changes
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // If HLS is natively supported (Safari)
      video.src = videoSources[quality];
    }

    return () => {
      player.destroy();
    };
  }, [quality]); // Re-run this effect when quality changes

  return (
    <div className="relative h-[30%] w-[80%] mx-auto">
      {/* Video Element */}
      <video ref={playerRef} className="h-full w-full object-contain" controls playsInline></video>

      {/* Custom Quality Selector */}
      <div className="absolute top-4 right-4 z-10 bg-gray-700 text-white p-2 rounded-lg">
        <span className="mr-2">Quality:</span>
        <select
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="bg-gray-800 text-white p-1 rounded"
        >
          <option value={240}>240p</option>
          <option value={480}>480p</option>
          <option value={720}>720p</option>
        </select>
      </div>
    </div>
  );
};

export default HlsVideoPlayer;
