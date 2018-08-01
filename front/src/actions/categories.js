import {
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_LOADING,
  ALL_CATEGORIES_FAILED
} from "./types";

export const allCategoriesSuccess = (categories) => {
  console.log('List of all categories', categories);
  return {
    type: ALL_CATEGORIES_SUCCESS,
    payload: categories
  }
}

export const allCategoriesLoading = () => {
  console.log('Loading categories');
  return {
    type: ALL_CATEGORIES_LOADING,
  }
}

export const allCategoriesFailed = (error) => {
  console.log('Error from fetch', error);
  return {
    type: ALL_CATEGORIES_FAILED,
    payload: error
  }
}
