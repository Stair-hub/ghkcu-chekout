import React from 'react';
import { createRoot } from 'react-dom/client';
import { CarouselPlayer } from './CarouselPlayer';

const container = document.getElementById('react-carousel-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <CarouselPlayer />
    </React.StrictMode>
  );
}
