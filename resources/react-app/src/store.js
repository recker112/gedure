//Redux
import { createStore, combineReducers } from 'redux';

import settings from './reducers/settings';
import userData from './reducers/userData';
import forms from './reducers/forms';

const reducers = combineReducers({settings,userData,forms});

const store = createStore(
	reducers
);

export default store;