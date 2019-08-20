import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // set into header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
