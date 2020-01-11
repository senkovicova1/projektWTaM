import { REGISTER, LOG_IN, LOG_OUT } from "../constants";

export function register(payload) {
  return { type: REGISTER, payload: {uid: payload.uid, username: payload.username}}
};

export function logIn(payload) {
  return { type: LOG_IN, payload: {uid: payload.uid, username: payload.username}}
};

export function logOut(payload) {
  return { type: LOG_OUT }
};
