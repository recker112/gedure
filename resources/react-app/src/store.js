//Redux
import { createStore, combineReducers } from 'redux';

import settings from './reducers/settings';
import userData from './reducers/userData';
import forms from './reducers/forms';
import dialogs from './reducers/dialogs';
import appData from './reducers/appData';

const reducers = combineReducers({settings,userData,forms,dialogs,appData});

const store = createStore(
	reducers
);

export default store;