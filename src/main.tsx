import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import { initGA } from './lib/ga.ts';

initGA();

createRoot(document.getElementById('root')!).render(<App />);
