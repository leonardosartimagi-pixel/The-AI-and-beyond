'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PortfolioVideoPlayerProps {
  imageSrc: string;
  videoSrc: string;
  videoWebmSrc: string;
  alt: string;
  prefersReducedMotion: boolean;
}

export function PortfolioVideoPlayer({
  imageSrc,
  videoSrc,
  videoWebmSrc,
  alt,
  prefersReducedMotion,
}: PortfolioVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const handleCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleError = useCallback(() => {
    setHasVideoError(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setHasVideoError(true);
      });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.pause();
    };
  }, [prefersReducedMotion, handleCanPlay, handleError]);

  const showVideo = !prefersReducedMotion && !hasVideoError;

  return (
    <div className="relative h-full w-full">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 672px) 100vw, 672px"
        className="object-cover"
        quality={80}
        loading="eager"
      />

      {showVideo && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoReady ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <source src={videoWebmSrc} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
      )}
    </div>
  );
}
