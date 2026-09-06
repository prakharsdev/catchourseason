import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const PILLS = [
  { label: 'Watch on YouTube', href: 'https://www.youtube.com/@CatchOurSeason' },
  { label: 'Follow on Instagram', href: 'https://www.instagram.com/catchourseason' },
];

const EMAIL = 'contact.catchourseason@gmail.com';

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function Hero() {
  const { displayed, done } = useTypewriter(
    "Hey there, we're Prakhar & Ragni, the CatchOurSeason couple. \nGlad you stopped by, we create content around countries, \ncultures and food, turning every trip into \na seasonic story worth catching"
  );
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
  };

  const pillStyle = {
    opacity: pillsVisible ? 1 : 0,
    transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  } as const;

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
        <p
          className="mb-5 text-[13px] text-black sm:mb-6 sm:text-[15px]"
          style={{
            lineHeight: 1.5,
            fontWeight: 400,
            minHeight: '110px',
            whiteSpace: 'pre-line',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-black align-middle"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          )}
        </p>

        <div className="flex flex-wrap gap-y-1">
          {PILLS.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              style={pillStyle}
            >
              {pill.label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleCopy}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
            style={pillStyle}
          >
            Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
