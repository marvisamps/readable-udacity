import * as ReadableAPI from '../utils/ReadableAPI';
import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  // ADD_POST,
  // DELETE_POST,
  // EDIT_POST,
} from './constants';

export const fetchPosts = (category) => {
  return dispatch => {
    return ReadableAPI.fetchPosts(category)
      .then(posts => dispatch({
        type: RECEIVE_POSTS,
        posts
      }))
  }
}

export const fetchPost = (id) => {
  return dispatch => {
    return ReadableAPI.fetchPost(id)
      .then(post => dispatch({
        type: RECEIVE_POST,
        post
      }))
  }
}

export const votePost = (id, option) => {
  return dispatch => {
    return ReadableAPI.votePost(id, option)
      .then(post => ReadableAPI.fetchPosts()
        .then(posts => dispatch({
          type: RECEIVE_POSTS,
          posts
        })))
  }
}

export const votePostDetail = (id, option) => {
  return dispatch => {
    return ReadableAPI.votePost(id, option)
      .then(post => ReadableAPI.fetchPost(post.id)
        .then(post => dispatch({
          type: RECEIVE_POST,
          post
        })))
  }
}

export const addPost = (post) => {
  post = {
    ...post,
    timestamp: Date.now(),
  };

  return dispatch => {
    return ReadableAPI.addPost(post)
      .then(post => ReadableAPI.fetchPosts(post.category)
        .then(posts => dispatch({
          type: RECEIVE_POSTS,
          posts
        })))
  }
}

export const editPost = (post) => {
  return dispatch => {
    return ReadableAPI.editPost(post)
      .then(post => ReadableAPI.fetchPosts(post.category)
        .then(posts => dispatch({
          type: RECEIVE_POSTS,
          posts
        })))
  }
}

export const deletePost = (post) => {
  return dispatch => {
    return ReadableAPI.deletePost(post)
      .then(post => ReadableAPI.fetchPosts()
        .then(posts => dispatch({
          type: RECEIVE_POSTS,
          posts
        })))
  }
}
