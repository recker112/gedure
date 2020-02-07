import { createStore, combineReducers } from 'redux';
import updateData from './reducer/updateData';

const reducers = combineReducers({
    updateData
});

const store = createStore(
    reducers
);

export default store;