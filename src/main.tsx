import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import { initGA, sendPageView } from './lib/ga.ts';

initGA();
sendPageView(window.location.pathname);

createRoot(document.getElementById('root')!).render(<App />);
