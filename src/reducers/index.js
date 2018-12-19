import { combineReducers } from 'redux';
import moviesReducer from './reducer_movies';
import creditsReducer from './reducer_credits';

const rootReducer = combineReducers({
  movies: moviesReducer,
  credits: creditsReducer
});

export default rootReducer;