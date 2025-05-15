"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { optimizeVideoPerformance } from '@/utils/video';

// Extend HTMLVideoElement interface to include our custom properties
interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  lastCurrentTime?: number;
  cleanup?: () => void;
  _eventHandlers?: {
    handleStall: () => void;
    handleVisibilityChange: () => void;
  };
}

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
  overlayOpacity?: number;
  blurAmount?: number;
}

export default function BackgroundVideo({
  sources,
  poster,
  className = '',
  fallbackImage,
  priority = false,
  overlayOpacity = 0.3,
  blurAmount = 0
}: BackgroundVideoProps) {
  const videoRef = useRef<ExtendedHTMLVideoElement>(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoControls = useAnimation();

  // Reference to an ExtendedHTMLVideoElement instead of HTMLVideoElement

  // Video loading and error handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let loadingTimeout: NodeJS.Timeout;
    // let keepAliveInterval: NodeJS.Timeout;

    if (priority) {
      // Add a loading indicator class
      document.body.classList.add('video-loading');
      // Timeout to ensure we show loading state for at least a minimum time
      loadingTimeout = setTimeout(() => {
        document.body.classList.remove('video-loading');
      }, 1500);
    }

    const handleCanPlay = () => {
      if (priority) document.body.classList.remove('video-loading');
      // setIsLoaded(true);

      // Animate in with Framer Motion
      videoControls.start({
        opacity: overlayOpacity,
        scale: 1.02,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
      });

      // video.play().catch(err => {
      //   console.log('Auto-play prevented:', err);
      //   // Still mark as loaded even if autoplay fails
      //   // setIsLoaded(true);
      // });
    };

    const handleError = () => {
      console.error('Video failed to load');
      if (priority) document.body.classList.remove('video-loading');
      setHasError(true);
      // setIsLoaded(true); // Mark as loaded to remove loading indicator
    };

    const handleProgress = () => {
      // Check if enough of the video has been buffered to start playing smoothly
      if (video.buffered.length > 0) {
        const bufferedTime = video.buffered.end(0);
        const duration = video.duration;

        if (bufferedTime / duration > 0.1) { // At least 10% buffered
          clearTimeout(loadingTimeout);
          if (priority) document.body.classList.remove('video-loading');
        }
      }
    };

    // Handle video pause or stall
    const handleStall = () => {
      if (video.paused && !video.ended) {
        video.play().catch(err => console.log('Failed to resume video:', err));
      }
    };

    // Apply optimizations
    optimizeVideoPerformance(video);

    // Event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('pause', handleStall);
    video.addEventListener('stalled', handleStall);

    // Set up a keep-alive interval to ensure video continues playing
    const keepAliveInterval = setInterval(() => {
      if (video && !video.paused && !video.ended) {
        // Keep video active and check if it needs to be restarted
        if (video.currentTime === video.lastCurrentTime && video.currentTime > 0) {
          console.log('Video playback stalled, restarting');
          // Try to recover by seeking slightly forward and restarting playback
          video.currentTime += 0.1;
          video.play().catch(err => console.log('Failed to restart video:', err));
        }
        video.lastCurrentTime = video.currentTime;
      }
    }, 5000); // Check more frequently (every 5 seconds)

    // Clean up
    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(keepAliveInterval);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('pause', handleStall);
      video.removeEventListener('stalled', handleStall);
      if (video.cleanup) video.cleanup();

      // Remove loading class if component unmounts while loading
      if (priority) document.body.classList.remove('video-loading');
    };
  }, [priority, videoControls, overlayOpacity]);

  // If video errors and we have a fallback image, render that instead
  if (hasError && fallbackImage) {
    return (
      <motion.div
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{
          backgroundImage: `url(${fallbackImage})`,
          filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none'
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: overlayOpacity, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    );
  }

  return (
    <motion.video
      ref={videoRef}
      className={`absolute inset-0 object-cover w-full h-full ${className}`}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={videoControls}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      poster={poster}
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none'
      }}
    >
      {sources.map((source, index) => (
        <source
          key={index}
          src={source.src}
          type={source.type}
          media={source.media}
        />
      ))}
    </motion.video>
  );
}
