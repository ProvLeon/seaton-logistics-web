/**
 * Utility functions for video handling in the Seaton Logistics website
 */

/**
 * Checks if the browser supports a specific video format
 * @param format - Video format to check (e.g., 'webm', 'mp4', 'ogg')
 * @returns Boolean indicating whether the format is supported
 */
export function isVideoFormatSupported(format: string): boolean {
  const video = document.createElement('video');
  
  switch (format.toLowerCase()) {
    case 'webm':
      return video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
    case 'mp4':
      return video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') !== '';
    case 'ogg':
      return video.canPlayType('video/ogg; codecs="theora, vorbis"') !== '';
    default:
      return false;
  }
}

/**
 * Preloads a video for smoother playback
 * @param videoUrl - URL of the video to preload
 * @param quality - Quality level ('low', 'medium', 'high')
 * @returns Promise that resolves when preloading starts
 */
export function preloadVideo(videoUrl: string, quality: 'low' | 'medium' | 'high' = 'medium'): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = videoUrl;
    link.as = 'video';
    
    // Set fetch priority based on quality
    if (quality === 'high') {
      link.setAttribute('fetchpriority', 'high');
    } else if (quality === 'low') {
      link.setAttribute('fetchpriority', 'low');
    }
    
    document.head.appendChild(link);
    setTimeout(resolve, 100); // Resolves after a small delay
  });
}

/**
 * Optimizes video element for performance
 * @param videoElement - The video element to optimize
 */
export function optimizeVideoPerformance(videoElement: HTMLVideoElement): void {
  if (!videoElement) return;
  
  // Set video attributes for performance
  videoElement.playsInline = true;
  videoElement.muted = true;
  videoElement.setAttribute('disablePictureInPicture', '');
  videoElement.setAttribute('disableRemotePlayback', '');
  
  // Reduce resolution for mobile devices
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      
      if (width < 768) {
        videoElement.style.transform = 'scale(1.2)'; // Zoom slightly to hide edges
        videoElement.style.opacity = '0.35';
      } else {
        videoElement.style.transform = 'none';
        videoElement.style.opacity = '0.4';
      }
    }
  });
  
  resizeObserver.observe(videoElement);
  
  // Cleanup function - to be called when component unmounts
  videoElement.cleanup = () => {
    resizeObserver.disconnect();
  };
}

/**
 * Gets the most appropriate video source based on browser and network
 * @param sources - Array of source objects with src and type
 * @returns The optimal source URL
 */
export function getOptimalVideoSource(
  sources: Array<{ src: string; type: string; quality: 'low' | 'medium' | 'high' }>
): string {
  // Check for slow connection
  const isSlowConnection = 
    navigator.connection?.saveData || 
    (navigator.connection?.effectiveType === '2g') ||
    (navigator.connection?.effectiveType === 'slow-2g');
  
  if (isSlowConnection) {
    // Find the lowest quality option
    const lowQualitySource = sources.find(s => s.quality === 'low');
    if (lowQualitySource) return lowQualitySource.src;
  }
  
  // Try to use the best format the browser supports
  for (const source of sources) {
    const format = source.type.split('/')[1];
    if (isVideoFormatSupported(format)) {
      return source.src;
    }
  }
  
  // Fallback to the first source
  return sources[0].src;
}