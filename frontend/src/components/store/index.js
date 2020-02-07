import { createStore, combineReducers } from 'redux';
import settings from './reducer/settings';

const reducers = combineReducers({
    settings,
});

const store = createStore(
    reducers
);

export default store;