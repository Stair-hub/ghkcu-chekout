import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, Video } from 'remotion';

const videos = [
  '/assets/skin-homme-1.mp4',
  '/assets/skin-homme-2.mp4',
  '/assets/skin-homme-3.mp4',
  '/assets/skin-homme-4.mp4',
];

const Slide = ({ src }: { src: string }) => {
  const frame = useCurrentFrame();

  // Opacity: de 0 à 1 sur 90 frames (3 secondes)
  const opacity = interpolate(
    frame,
    [0, 90],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // TranslateY: glisse vers le haut après ses 90 frames
  // On commence le slide vers le haut à la frame 85 jusqu'à 105
  const translateY = interpolate(
    frame,
    [85, 105],
    [0, -100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ transform: `translateY(${translateY}%)`, opacity }}>
      <Video 
        src={src} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        muted 
      />
    </AbsoluteFill>
  );
};

export const CarouselComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', overflow: 'hidden', borderRadius: '30px' }}>
      {videos.map((src, i) => {
        return (
          <Sequence key={i} from={i * 90} durationInFrames={120}>
            <Slide src={src} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
