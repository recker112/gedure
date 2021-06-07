//Redux
import { createStore, combineReducers } from 'redux';

import settings from './reducers/settings';
import userData from './reducers/userData';
import forms from './reducers/forms';
import dialogs from './reducers/dialogs';
import steppers from './reducers/steppers';

const reducers = combineReducers({settings, userData, forms, dialogs, steppers});

const store = createStore(
	reducers
);

export default store;