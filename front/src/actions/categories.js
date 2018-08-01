import * as ReadableAPI from '../utils/ReadableAPI';
import { RECEIVE_CATEGORIES } from './constants';

export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => {
  return dispatch => {
    return ReadableAPI.fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)))
  }
}
