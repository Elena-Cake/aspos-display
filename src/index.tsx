import React from 'react';
import ReactDOM from 'react-dom/client';
import './_normalize.scss'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);

