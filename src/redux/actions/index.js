import { REGISTER, LOG_IN, LOG_OUT } from "../constants";


export const register = (user) => {
  return (dispatch) => {
    dispatch({ type: REGISTER, user });
  };
};

export const logIn = (user) => {
  return (dispatch) => {
    dispatch({ type: LOG_IN, user });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT});
  };
};
