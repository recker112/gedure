import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// SCSS
import './scss/app.scss';

// Axios
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = window.location.protocol + '//localhost:8000/api';
//window.axios.defaults.baseURL = window.location.protocol + "//" + window.location.host + '/api';

// React Render
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);