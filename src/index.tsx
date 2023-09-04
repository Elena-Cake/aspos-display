import React from 'react';
import ReactDOM from 'react-dom/client';
import './_normalize.scss'
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <App />
  </HashRouter>

);

