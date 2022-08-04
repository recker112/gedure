import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './App';

// SnackBar
import { SnackbarProvider } from 'notistack';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// SCSS
import './scss/app.scss';

// Axios
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
if (process.env.NODE_ENV !== 'production') {
  window.axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + '/api';
}else {
  window.axios.defaults.baseURL = window.location.protocol + "//" + window.location.host + '/api';
}

// React Render
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);