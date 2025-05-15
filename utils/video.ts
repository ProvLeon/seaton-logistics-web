/**
 * Utility functions for video handling in the Seaton Logistics website
 */

/**
 * Checks if the browser supports a specific video format
 * @param format - Video format to check (e.g., 'webm', 'mp4', 'ogg')
 * @returns Boolean indicating whether the format is supported
 */
export function isVideoFormatSupported(format: string): boolean {
  if (typeof window === 'undefined') return false;

  const video = document.createElement('video');

  switch (format.toLowerCase()) {
    case 'webm':
      return video.canPlayType('video/webm; codecs="vp9, opus"') !== '' ||
        video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
    case 'mp4':
      return video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') !== '' ||
        video.canPlayType('video/mp4; codecs="av01.0.05M.08"') !== '';
    case 'ogg':
      return video.canPlayType('video/ogg; codecs="theora, vorbis"') !== '';
    default:
      return false;
  }
}

/**
 * Preloads a video for smoother playback with enhanced browser support
 * @param videoUrl - URL of the video to preload
 * @param quality - Quality level ('low', 'medium', 'high')
 * @param options - Additional options for preloading
 * @returns Promise that resolves when preloading starts
 */
export function preloadVideo(
  videoUrl: string,
  quality: 'low' | 'medium' | 'high' = 'medium',
  options?: {
    timeout?: number,
    crossOrigin?: 'anonymous' | 'use-credentials' | ''
  }
): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  return new Promise((resolve) => {
    // Create preload link
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

    // Set crossorigin if provided
    if (options?.crossOrigin) {
      link.crossOrigin = options.crossOrigin;
    }

    document.head.appendChild(link);

    // Also create a hidden video element to start loading
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.src = videoUrl;
    video.style.display = 'none';
    video.load(); // Start loading the video data

    setTimeout(() => {
      // Clean up the video element
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
      resolve();
    }, options?.timeout || 100);
  });
}

// Extended HTMLVideoElement interface to include our custom properties
interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  lastCurrentTime?: number;
  cleanup?: () => void;
  _eventHandlers?: {
    handleStall: () => void;
    handleVisibilityChange: () => void;
  };
}

/**
 * Optimizes video element for performance with enhanced features
 * @param videoElement - The video element to optimize
 * @param options - Additional optimization options
 */
export function optimizeVideoPerformance(
  videoElement: ExtendedHTMLVideoElement, 
  options?: {
    mobileOpacity?: number,
    desktopOpacity?: number,
    mobileScale?: number,
    desktopScale?: number,
    mobileSizePx?: number,
    lowPowerMode?: boolean,
    preventStalling?: boolean
  }
): void {
  if (!videoElement) return;
  
  const {
    mobileOpacity = 0.35,
    desktopOpacity = 0.4,
    mobileScale = 1.2,
    desktopScale = 1.0,
    mobileSizePx = 768,
    lowPowerMode = false,
    preventStalling = true
  } = options || {};
  
  // Set video attributes for performance
  videoElement.playsInline = true;
  videoElement.muted = true;
  videoElement.loop = true; // Ensure video loops continuously
  videoElement.autoplay = true; // Ensure video starts automatically
  videoElement.setAttribute('disablePictureInPicture', '');
  videoElement.setAttribute('disableRemotePlayback', '');
  
  // Initialize the last current time tracker
  videoElement.lastCurrentTime = 0;
  
  // Add event listeners to handle potential stalling
  if (preventStalling) {
    // Event handlers for potential stalls
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoElement.paused) {
        videoElement.play().catch(err => console.log('Video resume error:', err));
      }
    };
    
    const handleStall = () => {
      console.log('Video stalled, attempting to restart');
      videoElement.currentTime += 0.1; // Skip ahead slightly
      videoElement.play().catch(err => console.log('Video restart error:', err));
    };
    
    // Add event listeners to recover from stalls
    videoElement.addEventListener('stalled', handleStall);
    videoElement.addEventListener('suspend', handleStall);
    videoElement.addEventListener('pause', handleStall); 
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Store original event listeners for cleanup
    videoElement._eventHandlers = {
      handleStall,
      handleVisibilityChange
    };
  }
  
  // Set playback quality for better performance
  if (lowPowerMode) {
    // Reduce quality on mobile or when low power mode is enabled
    if ('mediaSettings' in videoElement) {
      (videoElement as any).mediaSettings = { 
        preferredVideoQuality: 'standard' 
      };
    }
    
    // Reduce framerate for performance
    if (videoElement.playbackRate) {
      videoElement.playbackRate = 0.9; // Slightly slower playback
    }
  }
  
  // Use requestAnimationFrame for smoother transitions
  let animationFrameId: number;
  let currentScale = 1.0;
  let currentOpacity = desktopOpacity;
  let targetScale: number;
  let targetOpacity: number;
  
  // Reduce resolution for mobile devices
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      
      if (width < mobileSizePx) {
        targetScale = mobileScale;
        targetOpacity = mobileOpacity;
      } else {
        targetScale = desktopScale;
        targetOpacity = desktopOpacity;
      }
      
      // Smoothly animate to target values
      cancelAnimationFrame(animationFrameId);
      animateVideoProps();
    }
  });
  
  function animateVideoProps() {
    // Smooth animation for scale and opacity
    currentScale = currentScale + (targetScale - currentScale) * 0.1;
    currentOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.1;
    
    videoElement.style.transform = `scale(${currentScale})`;
    videoElement.style.opacity = String(currentOpacity);
    
    if (
      Math.abs(currentScale - targetScale) > 0.001 || 
      Math.abs(currentOpacity - targetOpacity) > 0.001
    ) {
      animationFrameId = requestAnimationFrame(animateVideoProps);
    }
  }
  
  resizeObserver.observe(videoElement);
  
  // Load video at appropriate time
  if (videoElement.readyState < 1) { // HAVE_NOTHING
    videoElement.addEventListener('loadedmetadata', () => {
      // Set initial time to skip blank intro if needed
      if (videoElement.duration > 0.5) {
        videoElement.currentTime = 0.1; // Start closer to beginning to avoid initial stalling
      }
      
      // Force play after metadata is loaded
      videoElement.play().catch(err => console.log('Auto-play failed:', err));
    }, { once: true });
  }
  
  // Improved performance with hardware acceleration
  videoElement.style.willChange = 'transform, opacity';
  
  // Cleanup function - to be called when component unmounts
  videoElement.cleanup = () => {
    resizeObserver.disconnect();
    cancelAnimationFrame(animationFrameId);
    
    // Remove event listeners to prevent memory leaks
    if (preventStalling && videoElement._eventHandlers) {
      videoElement.removeEventListener('stalled', videoElement._eventHandlers.handleStall);
      videoElement.removeEventListener('suspend', videoElement._eventHandlers.handleStall);
      videoElement.removeEventListener('pause', videoElement._eventHandlers.handleStall);
      document.removeEventListener('visibilitychange', videoElement._eventHandlers.handleVisibilityChange);
    }
    
    videoElement.style.willChange = 'auto';
  };
}

/**
 * Gets the most appropriate video source based on browser, network, and device
 * @param sources - Array of source objects with src, type, and quality
 * @param preferredQuality - Optional user preference for quality
 * @returns The optimal source URL
 */
export function getOptimalVideoSource(
  sources: Array<{ 
    src: string; 
    type: string; 
    quality: 'low' | 'medium' | 'high'; 
    size?: number; // file size in KB
    width?: number; // video width in pixels
  }>,
  preferredQuality?: 'low' | 'medium' | 'high'
): string {
  if (typeof window === 'undefined') {
    // Server-side - return first source or medium quality if available
    const mediumSource = sources.find(s => s.quality === 'medium');
    return mediumSource ? mediumSource.src : sources[0].src;
  }
  
  // If user has set a preferred quality, prioritize that
  if (preferredQuality) {
    const preferredSource = sources.find(s => s.quality === preferredQuality);
    if (preferredSource) return preferredSource.src;
  }
  
  // Check for battery status if available
  const isBatteryLow = 'getBattery' in navigator &&
    (navigator as any).getBattery && 
    (navigator as any).getBattery().then((battery: any) => battery.level < 0.15);
    
  // Device and connection checks
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSlowConnection = 
    navigator.connection?.saveData || 
    (navigator.connection?.effectiveType === '2g') ||
    (navigator.connection?.effectiveType === 'slow-2g') || 
    (navigator.connection?.effectiveType === '3g' && isMobile);
  
  // Check for data saver mode
  const isDataSaver = navigator.connection?.saveData === true;
  
  // Screen size/resolution check for optimal quality
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // Determine optimal quality based on all factors
  let optimalQuality: 'low' | 'medium' | 'high';
  
  if (isDataSaver || isSlowConnection || isBatteryLow) {
    optimalQuality = 'low';
  } else if (isMobile || screenWidth < 768) {
    optimalQuality = screenWidth < 480 ? 'low' : 'medium';
  } else {
    // For desktop/larger screens
    optimalQuality = screenWidth < 1080 ? 'medium' : 'high';
  }
  
  // Find a source matching optimal quality and supported format
  const matchingSources = sources.filter(source => {
    const format = source.type.split('/')[1];
    return source.quality === optimalQuality && isVideoFormatSupported(format);
  });
  
  if (matchingSources.length > 0) {
    // If multiple sources match, choose one with appropriate dimensions for screen size
    if (screenWidth && matchingSources.some(s => s.width)) {
      const sizedSource = matchingSources.find(s => s.width && s.width >= screenWidth);
      if (sizedSource) return sizedSource.src;
    }
    return matchingSources[0].src;
  }
  
  // Fall back to any source with the optimal quality
  const qualitySource = sources.find(s => s.quality === optimalQuality);
  if (qualitySource) return qualitySource.src;
  
  // Try to use any format the browser supports (prioritize by quality)
  const qualities: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];
  for (const quality of qualities) {
    for (const source of sources) {
      if (source.quality === quality) {
        const format = source.type.split('/')[1];
        if (isVideoFormatSupported(format)) {
          return source.src;
        }
      }
    }
  }
  
  // Ultimate fallback to the first source
  return sources[0].src;
}
