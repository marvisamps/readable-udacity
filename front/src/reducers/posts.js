import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  // ADD_POST,
  // DELETE_POST,
  // EDIT_POST
} from '../actions/constants';

const posts = (state = {}, action) => {
  const { posts, post } = action;
  switch (action.type) {
    case RECEIVE_POSTS:
      return posts
    case RECEIVE_POST:
      return post
    default:
      return state
  }
}

export default posts;
