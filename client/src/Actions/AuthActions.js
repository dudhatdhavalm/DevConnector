import axios from "axios";
import { setAuthToken } from "../Utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./Types";
import jwt_decode from "jwt-decode";

// register new user
export const registerUser = (newUser, history) => {
  return dispatch => {
    axios
      .post("/api/users/register", newUser)
      .then(res => history.push("/login"))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// Login
export const loginUser = data => {
  return dispatch => {
    axios
      .post("/api/users/login", data)
      .then(res => {
        // Save to LocalStorage
        const { token } = res.data;
        // set token
        localStorage.setItem("jwtToken", token);
        // set token to auth header
        setAuthToken(token);
        // decode the token to get user
        const decoded = jwt_decode(token);
        // set user into redux store
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
};

// set user info into redux
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// set user to logout
export const logoutUser = () => {
  return dispatch => {
    // remove token from localsotrage
    localStorage.removeItem("jwtToken");
    // remove auth header from axios
    setAuthToken(false);
    // remove current object from redux
    dispatch(setCurrentUser({}));
  };
};
