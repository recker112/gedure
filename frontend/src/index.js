//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//Components
import App from './views/Index';


//Redux
import store from './store';
import { Provider } from 'react-redux';

//Styles
import './assets/scss/app.scss';

//ServiceWorker
import * as serviceWorker from './serviceWorker';

//Lodash
window = require('lodash');

//axios
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
