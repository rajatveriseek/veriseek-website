"use client";

import { useState } from "react";
import Image from "next/image";

interface LazyYouTubeProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function LazyYouTube({ videoId, title = "YouTube video", className }: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isLoaded) {
    return (
      <iframe
        className={className}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ border: 0, aspectRatio: "16/9" }}
      />
    );
  }

  return (
    <button
      onClick={() => setIsLoaded(true)}
      aria-label={`Play ${title}`}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        border: "none",
        padding: 0,
        cursor: "pointer",
        background: "#000",
        display: "block",
      }}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
      {/* Play button overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <svg width="68" height="48" viewBox="0 0 68 48" fill="none">
          <path
            d="M66.52 7.74C65.81 4.98 63.68 2.85 60.92 2.14C55.56 0.68 34.18 0.68 34.18 0.68S12.79 0.68 7.43 2.14C4.68 2.85 2.55 4.98 1.84 7.74C0.37 13.1 0.37 24.18 0.37 24.18S0.37 35.26 1.84 40.62C2.55 43.38 4.68 45.42 7.43 46.12C12.79 47.58 34.18 47.58 34.18 47.58S55.56 47.58 60.92 46.12C63.68 45.42 65.81 43.38 66.52 40.62C67.98 35.26 67.98 24.18 67.98 24.18S67.98 13.1 66.52 7.74Z"
            fill="#FF0000"
          />
          <path d="M27.16 34.18L44.98 24.18L27.16 14.18V34.18Z" fill="#FFFFFF" />
        </svg>
      </div>
    </button>
  );
}
