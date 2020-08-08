//Redux
import { createStore, combineReducers } from 'redux';

import settings from './reducers/settings';
import userData from './reducers/userData';

const reducers = combineReducers({settings,userData});

const store = createStore(
    reducers
);

export default store;