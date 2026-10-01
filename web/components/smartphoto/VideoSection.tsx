"use client";

import React from "react";

export const VideoSection: React.FC = () => {
  return (
    <section className="homepage-video fadein visible">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-8 text-center mx-auto">
            <video
              width="100%"
              poster="/images/homepage/image-video-editing.webp"
              controls
              playsInline
              preload="metadata"
              className="rounded-2xl shadow-xl"
            >
              <source src="/images/spe_Showreel_2024.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
