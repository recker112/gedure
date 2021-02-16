//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//Components
import App from './App';

//Redux
import store from './store';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

/* BOOTSTRAP */
import './scss/app.scss';

//axios
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//Base Url
window.axios.defaults.baseURL = window.location.protocol + "//" + window.location.host + '/api';
//window.axios.defaults.baseURL = window.location.protocol + '//gedure8000.run-us-west2.goorm.io/api';

ReactDOM.render(
  <Provider store={store}>
    <Router
			getUserConfirmation={(message, callback) => {
				// this is the default behavior
				const allowTransition = window.confirm(message);
				callback(allowTransition);
			}}
		>
      <App/>
  	</Router>
	</Provider>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
