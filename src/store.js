import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import moviesReducer from './reducers/reducer_movies';
import creditsReducer from './reducers/reducer_credits';

// The root reducer will serve as the parent for all other reducers
// We will add our module reducers to the root level here
const rootReducer = combineReducers({
    movies: moviesReducer,
    credits: creditsReducer
});

// Will log information about dispatched actions to the console
// including the previous state, the action details, and the next state
const loggerMiddleware = createLogger();

const store = createStore(
  // reducer
  rootReducer,
  // preloadedState
  undefined,
  // compose simply enables us to apply several store enhancers
  // Right now, we are only using applyMiddlware, so this is
  // just future-proofing our application
  compose(
    // Middlware can intercept dispatched actions before they reach the reducer
    // in order to modify it in some way
    applyMiddleware(
      // Thunk allows functions to be returned from action creators
      // so we can do things like dispatch multiple actions in a 
      // single action creator for async actions
      thunkMiddlware,
      // logger will output the previous state, next state, and
      // the action details to the console
      loggerMiddleware
    )
  )
);

export default store;