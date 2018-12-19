import { combineReducers } from 'redux';
import moviesReducer from './reducer_movies';
import creditsReducer from './reducer_credits';
import userReducer from './reducer_user';

const rootReducer = combineReducers({
  movies: moviesReducer,
  credits: creditsReducer,
  user: userReducer
});

export default rootReducer;