import { combineReducers } from 'redux';
import productsReducers from './productsReducers';
import currentProductReducers from './currentProductReducers';
import savedProductsReducers from './savedProductsReducers';

const reducers = {
    productsReducers,
    currentProductReducers,
    savedProductsReducers
};
export default combineReducers(reducers);
