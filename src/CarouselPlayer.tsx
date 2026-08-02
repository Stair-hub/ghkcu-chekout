import React, { useEffect, useRef, useState } from 'react';

const videos = [
  '/assets/skin-homme-1.mp4',
  '/assets/skin-homme-2.mp4',
  '/assets/skin-homme-3.mp4',
  '/assets/skin-homme-4.mp4',
];

const SLIDE_DURATION = 3000; // 3 secondes par slide

export const CarouselPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
      setAnimating(false);
    }, 600); // durée de l'animation CSS
  };

  useEffect(() => {
    timerRef.current = setTimeout(nextSlide, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
    }}>
      {videos.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '30px',
            opacity: i === currentIndex ? (animating ? 0 : 1) : 0,
            transform: i === currentIndex
              ? `translateY(${animating ? '-100%' : '0%'})`
              : i === (currentIndex + 1) % videos.length
                ? 'translateY(100%)'
                : 'translateY(100%)',
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
      ))}
    </div>
  );
};
