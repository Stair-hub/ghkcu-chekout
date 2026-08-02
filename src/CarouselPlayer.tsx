import React from 'react';
import { Player } from '@remotion/player';
import { CarouselComposition } from './CarouselComposition';

export const CarouselPlayer: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 40px rgba(0,0,0,0.15)' }}>
      <Player
        component={CarouselComposition}
        durationInFrames={360}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        style={{
          width: '100%',
          height: '100%',
        }}
        controls={false}
        autoPlay
        loop
      />
    </div>
  );
};
