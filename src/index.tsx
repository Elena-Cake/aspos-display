import React from 'react';
import ReactDOM from 'react-dom/client';
import './_normalize.scss'
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

) 