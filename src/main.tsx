import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.scss';
import { HomePage } from './pages/HomePage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
);
