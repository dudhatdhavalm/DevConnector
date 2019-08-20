import { GET_ERRORS, CLEAR_ERRORS } from "../Actions/Types";

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
