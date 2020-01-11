import { REGISTER, LOG_IN, LOG_OUT } from "../constants";

const initialState = {
  user: null
};
function rootReducer(state = initialState, action) {
  if (action.type === REGISTER) {
    return Object.assign({}, state, {
      user: action.payload
    });
  } else if (action.type === LOG_IN) {
    return Object.assign({}, state, {
      user: action.payload
    });
  } else if (action.type === LOG_OUT) {
    return Object.assign({}, state, {
      user: null
    });
  }
  return state;
};
export default rootReducer;
