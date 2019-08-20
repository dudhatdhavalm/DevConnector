import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_PROFILES
} from "./Types";

// Get Current User Profile
export const getCurrentUserProfile = () => {
  return dispatch => {
    dispatch(setProfileLoading());
    axios
      .get("/api/profile")
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
  };
};

// Create user profile
export const createUserProfile = (profileData, history) => {
  return dispatch => {
    axios
      .post("/api/profile", profileData)
      .then(res => history.push("/dashboard"))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  };
};

export const addProfileExperience = (expData, history) => {
  return dispatch => {
    axios
      .post("/api/profile/experience", expData)
      .then(res => history.push("/dashboard"))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  };
};

export const addProfileEducation = (eduData, history) => {
  return dispatch => {
    axios
      .post("/api/profile/education", eduData)
      .then(res => history.push("/dashboard"))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  };
};

// Delete Current User Account
export const deleteAccount = () => {
  return dispatch => {
    if (window.confirm("Are you sure? You want to delete account!")) {
      axios
        .delete("/api/profile")
        .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
        .catch(err =>
          dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
    }
  };
};

// Delete Profile Experience
export const deleteProfileExperience = id => {
  return dispatch => {
    if (window.confirm("Are you sure? You want to delete Experience!")) {
      axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(err =>
          dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
    }
  };
};

// delete profile education
export const deleteProfileEducation = id => {
  return dispatch => {
    if (window.confirm("Are you sure? You want to delete Education!")) {
      axios
        .delete(`/api/profile/education/${id}`)
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(err =>
          dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
    }
  };
};

// get All Developer Profiles
export const getAllProfiles = () => {
  return dispatch => {
    dispatch(setProfileLoading());
    axios
      .get("/api/profile/all")
      .then(res => {
        dispatch({ type: GET_PROFILES, payload: res.data });
      })
      .catch(err => dispatch({ type: GET_PROFILES, payload: null }));
  };
};

export const getProfileByHandle = handle => {
  return dispatch => {
    dispatch(setProfileLoading());
    axios
      .get(`/api/profile/handle/${handle}`)
      .then(res => {
        dispatch({ type: GET_PROFILE, payload: res.data });
      })
      .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
  };
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Current Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
