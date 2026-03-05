import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './main.css';
import App from './App.tsx';
import { initGA } from './shared/lib/analytics/ga';

initGA();

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
