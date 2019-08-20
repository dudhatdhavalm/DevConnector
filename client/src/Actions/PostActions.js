import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./Types";

// add post
export const addPost = postData => {
  return dispatch => {
    dispatch(clearErrors());
    axios
      .post("/api/posts", postData)
      .then(res => {
        dispatch({ type: ADD_POST, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

// fetch All post
export const getPosts = () => {
  return dispatch => {
    dispatch(setPostLoading());
    axios
      .get("/api/posts")
      .then(res => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_POSTS, payload: null });
      });
  };
};

export const deletePost = id => {
  return dispatch => {
    axios
      .delete(`/api/posts/${id}`)
      .then(res => {
        dispatch({ type: DELETE_POST, payload: id });
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

export const addLike = postId => {
  return dispatch => {
    axios
      .post(`/api/posts/like/${postId}`)
      .then(res => {
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

export const removeLike = postId => {
  return dispatch => {
    axios
      .post(`/api/posts/unlike/${postId}`)
      .then(res => {
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

// fetch post
export const getPost = id => {
  return dispatch => {
    setPostLoading();
    axios
      .get(`/api/posts/${id}`)
      .then(res => {
        dispatch({ type: GET_POST, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_POST, payload: null });
      });
  };
};

//add Comment
export const addComment = (postId, commentData) => {
  return dispatch => {
    dispatch(clearErrors());
    axios
      .post(`/api/posts/comment/${postId}`, commentData)
      .then(res => {
        dispatch({ type: GET_POST, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

//Delete Comment
export const deleteComment = (postId, commentId) => {
  return dispatch => {
    axios
      .delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res => {
        dispatch({ type: GET_POST, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

// set Loading True
const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear Errors
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
