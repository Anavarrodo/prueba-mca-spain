import { combineReducers } from 'redux';
import productsReducers from './productsReducers';
import currentProductReducers from './currentProductReducers';

const reducers = {
    productsReducers,
    currentProductReducers
};
export default combineReducers(reducers);
