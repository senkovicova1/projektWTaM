import { REGISTER, LOG_IN, LOG_OUT } from "../constants";

const initialState = {
  user: null
};
function rootReducer(state = initialState, action) {
  if (action.type === REGISTER) {
    return {...state, user: action.payload};
  } else if (action.type === LOG_IN) {
    return {...state, user: action.payload};
  } else if (action.type === LOG_OUT) {
    console.log("logging out");
    return {...state, user: null};
  }
  return state;
};
export default rootReducer;
