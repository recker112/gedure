//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//Components
import App from './views/App';


//Redux
import store from './store';
import { Provider } from 'react-redux';

//Styles
import './assets/scss/Base.scss';

//ServiceWorker
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
