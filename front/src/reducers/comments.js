import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
} from '../actions/constants';

const comments = (state = {}, action) => {
  const { comments, comment } = action;
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return comments
    case RECEIVE_COMMENT:
      return comment
    default:
      return state
  }
}

export default comments;
