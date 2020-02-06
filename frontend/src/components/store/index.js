import { createStore, combineReducers } from 'redux';
import temaReducer from './themeChange/reducer';

const reducers = combineReducers({
    temaReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;