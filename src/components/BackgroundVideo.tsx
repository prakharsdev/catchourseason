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

    const handleTouchStart = (e: TouchEvent) => {
      prevXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.touches[0].clientX;
        return;
      }

      const currentX = e.touches[0].clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      if (!video.duration || Number.isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const base = seekPendingRef.current ? targetTimeRef.current : video.currentTime;
      requestSeek(base + timeOffset);
    };

    // Mobile browsers often leave the video showing a blank/black frame
    // until playback is told to start. Briefly playing and immediately
    // pausing forces the first frame to render without the video actually
    // running.
    const handleLoadedData = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {
            // Autoplay was blocked; the next touch/mouse interaction will
            // trigger a seek, which also renders a frame.
          });
      }
    };

    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadeddata', handleLoadedData);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('loadeddata', handleLoadedData);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-white">
      <video
        ref={videoRef}
        className="h-full w-full object-contain object-center sm:object-cover sm:object-[70%_center]"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
