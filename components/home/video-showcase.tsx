"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/image-utils"

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">See Sharkathon in Action</h2>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
            Watch our students pitch their innovative ideas and learn from industry experts
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative rounded-xl overflow-hidden shadow-2xl">
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Image
                src={getImageUrl("video-thumbnail") || "/placeholder.svg"}
                alt="Sharkathon Video Thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <Button
                onClick={togglePlay}
                className="bg-secondary text-primary hover:bg-secondary/90 h-16 w-16 rounded-full flex items-center justify-center"
              >
                <Play className="h-8 w-8" />
                <span className="sr-only">Play video</span>
              </Button>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full aspect-video"
            controls={isPlaying}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/videos/sharkathon-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {isPlaying && (
            <Button
              onClick={togglePlay}
              className="absolute bottom-4 right-4 bg-secondary text-primary hover:bg-secondary/90 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Pause className="h-5 w-5" />
              <span className="sr-only">Pause video</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoShowcase

