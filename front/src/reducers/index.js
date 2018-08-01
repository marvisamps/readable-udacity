import { combineReducers } from 'redux';
import allCategoriesReducer from './categories';

const allReducers = combineReducers({
  categories: allCategoriesReducer
});

export default allReducers
