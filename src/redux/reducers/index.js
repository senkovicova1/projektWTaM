import { REGISTER, LOG_IN, LOG_OUT } from "../constants";

const initialState = {
  user: null,
  loggedIn: false,
};
function rootReducer(state = initialState, action) {
  if (action.type === REGISTER) {
    return {...state, user: action.user, loggedIn: true};
  } else if (action.type === LOG_IN) {
    return {...state, user: action.user, loggedIn: true};
  } else if (action.type === LOG_OUT) {
    return initialState;
  }
  return state;
};
export default rootReducer;
