import uuid from 'uuid';
import * as ReadableAPI from '../utils/ReadableAPI';
import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
} from './constants';

export const fetchComments = (id) => {
  return dispatch => {
    return ReadableAPI.fetchComments(id)
      .then(comments => dispatch({
        type: RECEIVE_COMMENTS,
        comments,
      }))
  }
}

export const fetchComment = (id) => {
  return dispatch => {
    return ReadableAPI.fetchComment(id)
      .then(comment => dispatch({
        type: RECEIVE_COMMENT,
        comment
      }))
  }
}

export const voteComment = (id, option) => {
  return dispatch => {
    return ReadableAPI.voteComment(id, option)
      .then(comment => ReadableAPI.fetchComments(comment.parentId)
        .then(comments => dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })))
  }
}

export const addComment = (comment) => {
  comment = {
    ...comment,
    id: uuid.v4(),
    timestamp: Date.now(),
  };

  return dispatch => {
    return ReadableAPI.addComment(comment)
      .then(comment => ReadableAPI.fetchComments(comment.parentId)
        .then(comments => dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })))
  }
}

export const deleteComment = (comment) => {
  return dispatch => {
    return ReadableAPI.deleteComment(comment)
      .then(comment => ReadableAPI.fetchComments(comment.parentId)
        .then(comments => dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })))
  }
}

export const editComment = (comment) => {
  return dispatch => {
    return ReadableAPI.editComment(comment)
      .then(comment => ReadableAPI.fetchComments(comment.parentId)
        .then(comments => dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })))
  }
}
