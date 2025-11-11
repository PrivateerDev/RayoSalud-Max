import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Debe incluir @tailwind base; @tailwind components; @tailwind utilities
import App from './App.jsx';

// Punto de montaje principal
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento #root en el HTML');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);