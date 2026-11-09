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
  const title = initialData?.title || "Watch Our Studio In Action";
  const poster = initialData?.poster || "/images/homepage/image-video-editing.webp";
  const videoSrc = initialData?.videoSrc || "/images/spe_Showreel_2024.mp4";

  return (
    <section className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-400/30 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Studio Showreel</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Take a behind-the-scenes look at how our master retouching specialists transform commercial captures into breathtaking final assets.
          </p>
        </div>

        {/* Cinematic Video Container */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950/80 backdrop-blur-xl">
          <video
            width="100%"
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};
