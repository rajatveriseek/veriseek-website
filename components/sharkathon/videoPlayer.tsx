"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing for autoplay
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle play/pause state
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle mute/unmute state
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handler for when the video ends
  const handleVideoEnd = () => {
    setIsPlaying(false); // Set playing to false to show the replay button
  };

  // Effect to pause video when it's scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the video is not intersecting the viewport, pause it.
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.9, // Trigger when 50% of the video is out of view
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-90% group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        autoPlay // Video autoplays on load
        playsInline
        onEnded={handleVideoEnd} // Add onEnded event handler
      >
        Your browser does not support the video tag.
      </video>

      {/* Controls Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
        
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="p-4 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-colors"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>

        {/* Mute/Unmute Button in the corner */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={handleMuteToggle}
            className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-colors"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default VideoPlayer;