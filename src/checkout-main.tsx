import React from 'react';
import ReactDOM from 'react-dom/client';
import Checkout from './components/Checkout';
import './tailwind.css';

ReactDOM.createRoot(document.getElementById('checkout-root')!).render(
  <React.StrictMode>
    <Checkout />
  </React.StrictMode>
);
