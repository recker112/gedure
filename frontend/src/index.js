//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//Components
import App from './components/App';

//Styles
import './assets/scss/Base.scss';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
serviceWorker.unregister();
