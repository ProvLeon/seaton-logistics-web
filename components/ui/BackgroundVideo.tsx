"use client";

import { useRef, useEffect, useState } from 'react';
import { optimizeVideoPerformance } from '@/utils/video';

interface BackgroundVideoProps {
  sources: Array<{
    src: string;
    type: string;
    media?: string;
  }>;
  poster?: string;
  className?: string;
  fallbackImage?: string;
  priority?: boolean;
}

export default function BackgroundVideo({
  sources,
  poster,
  className = '',
  fallbackImage,
  priority = false
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Video loading and error handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Show loading state
    // if (priority) {
    //   document.body.classList.add('video-loading');
    // }

    const handleCanPlay = () => {
      if (priority) document.body.classList.remove('video-loading');
      setIsLoaded(true);
      video.play().catch(err => {
        console.log('Auto-play prevented:', err);
        // Still mark as loaded even if autoplay fails
        setIsLoaded(true);
      });
    };

    const handleError = () => {
      console.error('Video failed to load');
      if (priority) document.body.classList.remove('video-loading');
      setHasError(true);
      setIsLoaded(true); // Mark as loaded to remove loading indicator
    };

    // Apply optimizations
    optimizeVideoPerformance(video);

    // Event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Clean up
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      if (video.cleanup) video.cleanup();

      // Remove loading class if component unmounts while loading
      if (priority) document.body.classList.remove('video-loading');
    };
  }, [priority]);

  // If video errors and we have a fallback image, render that instead
  if (hasError && fallbackImage) {
    return (
      <div
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-40' : 'opacity-0'} ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      poster={poster}
    >
      {sources.map((source, index) => (
        <source
          key={index}
          src={source.src}
          type={source.type}
          media={source.media}
        />
      ))}
    </video>
  );
}
