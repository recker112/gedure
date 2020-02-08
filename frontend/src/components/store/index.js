//Redux
import { createStore, combineReducers } from 'redux';

//Reducers
import settings from './reducer/settings';
import dataLogin from './reducer/dataLogin';
import alertsStatus from './reducer/alertsStatus';
import news from './reducer/news';
import loginStatus from './reducer/loginStatus';
import userData from './reducer/userData';
import panelSettings from './reducer/panelSettings';

const reducers = combineReducers({
    settings,
    dataLogin,
    alertsStatus,
    news,
    loginStatus,
    userData,
    panelSettings
});


const store = createStore(
    reducers
);

export default store;