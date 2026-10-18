"use client";

import React from "react";

export interface VideoSectionProps {
  initialData?: {
    title?: string;
    poster?: string;
    videoSrc?: string;
  };
}

export const VideoSection: React.FC<VideoSectionProps> = ({ initialData }) => {
  const poster = initialData?.poster || "/images/homepage/image-video-editing.webp";
  const videoSrc = initialData?.videoSrc || "/images/spe_Showreel_2024.mp4";

  return (
    <section className="homepage-video fadein visible">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-8 text-center mx-auto">
            <video
              width="100%"
              poster={poster}
              controls
              playsInline
              preload="metadata"
              className="rounded-2xl shadow-xl"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
