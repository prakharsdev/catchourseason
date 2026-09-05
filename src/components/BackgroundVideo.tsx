import { useEffect, useRef } from 'react';

const SENSITIVITY = 1.8;
const VIDEO_SRC = '/hero-video.mp4';
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const seekPendingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const requestSeek = (time: number) => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const clamped = Math.min(Math.max(time, 0), video.duration);
      targetTimeRef.current = clamped;

      if (!seekPendingRef.current) {
        seekPendingRef.current = true;
        video.currentTime = clamped;
      }
    };

    const handleSeeked = () => {
      // If the target moved again while we were seeking, chase it.
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        video.currentTime = targetTimeRef.current;
      } else {
        seekPendingRef.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video.duration || Number.isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const base = seekPendingRef.current ? targetTimeRef.current : video.currentTime;
      requestSeek(base + timeOffset);
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
    />
  );
}
