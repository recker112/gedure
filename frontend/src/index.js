import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Axios
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = window.location.protocol + '//localhost:8000/api';
//window.axios.defaults.baseURL = window.location.protocol + "//" + window.location.host + '/api';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
