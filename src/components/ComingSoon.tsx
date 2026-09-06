import { useMemo } from 'react';

const MESSAGE = 'Stay tuned, something magical is coming...';

interface StarConfig {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
}

export default function ComingSoon() {
  const stars = useMemo<StarConfig[]>(() => {
    return Array.from({ length: 70 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#05050f] via-[#0d0d2b] to-[#1a1a3d] px-6 py-24">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      <h2
        className="relative max-w-3xl text-center"
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(20px, 5vw, 42px)',
          lineHeight: 1.5,
          color: '#f1d78c',
          letterSpacing: '0.04em',
        }}
      >
        {MESSAGE.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: 0,
              animation: 'letterReveal 0.6s ease forwards',
              animationDelay: `${0.4 + i * 0.06}s`,
              textShadow:
                '0 0 8px rgba(241, 215, 140, 0.8), 0 0 18px rgba(241, 215, 140, 0.35)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </section>
  );
}
