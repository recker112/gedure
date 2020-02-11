//Redux
import { createStore, combineReducers } from 'redux';

//Reducers
import settings from './reducers/settings';
import dataLogin from './reducers/dataLogin';
import alertsStatus from './reducers/alertsStatus';
import news from './reducers/news';
import loginStatus from './reducers/loginStatus';
import userData from './reducers/userData';
import panelSettings from './reducers/panelSettings';

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