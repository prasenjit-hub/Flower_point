
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import our consolidated styles
import './index.css';

const init = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

// Use DOMContentLoaded to ensure CSS and HTML are ready before React mounts
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
