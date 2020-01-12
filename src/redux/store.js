import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import rootReducer from "./reducers";

const enhancers = compose(
  applyMiddleware(ReduxThunk)
);

export default () => createStore(rootReducer, {}, enhancers);
