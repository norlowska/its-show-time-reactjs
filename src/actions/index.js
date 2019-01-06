import axios from 'axios'
import { URL_NP, API_KEY, URL_SEARCH } from '../constants'
import { loadState } from '../localStorage';
import { USER_MOVIES, NOW_PLAYING, SEARCH_RESULTS, SHORT_LIST, MOVIES_LIST } from '../constants'

/* action types */
export const SET_SHORTLIST_ORDER = 'SET_SHORTLIST_ORDER'
export const SET_MOVIESLIST_ORDER = 'SET_MOVIESLIST_ORDER'
export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const ERROR_MOVIES = 'ERROR_MOVIES'
export const ADD_MOVIE = 'ADD_MOVIE'
export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const RATE_MOVIE = 'RATE_MOVIE'

/* action creators */
export const addWatchedMovie = movie => {
  return {
    type: ADD_MOVIE,
    listType: USER_MOVIES,
    movie
  }
}

export const removeMovie = movie => {
  return {
    type: REMOVE_MOVIE,
    listType: USER_MOVIES,
    movie
  }
}

export const rateMovie = (movie, rate) => {
  return {
    type: RATE_MOVIE,
    movie,
    rate
  }
}

export const setOrder = (order, listType) => {
  switch (listType) {
    case SHORT_LIST:
      return {
        type: SET_SHORTLIST_ORDER,
        order
      }
    case MOVIES_LIST:
    default:
      return {
        type: SET_MOVIESLIST_ORDER,
        order
      }
  }

}

const requestMovies = (listType = NOW_PLAYING) => {
  return {
    type: REQUEST_MOVIES,
    listType,
    error: null
  }
}

const fetchMoviesSuccess = (listType = NOW_PLAYING, response) => {
  return {
    type: RECEIVE_MOVIES,
    listType,
    movies: response.data.results
  }
}

const fetchMoviesFailure = (listType, error) => {
  return {
    type: ERROR_MOVIES,
    listType,
    error: error,
    movies: []
  }
}

export const fetchMovies = (listType, query) => {
  let url;
  switch (listType) {
    case USER_MOVIES:
      return {
        type: RECEIVE_MOVIES,
        listType,
        movies: loadState(USER_MOVIES) || []
      }
    case NOW_PLAYING:
      url = `${URL_NP}`
      break
    case SEARCH_RESULTS:
      url = `${URL_SEARCH}${query}&${API_KEY}&include_adult=false`
      break
    default:
      url = `${URL_NP}`
      break
  }

  return dispatch => {
    dispatch(requestMovies(listType));

    axios
      .get(url)
      .then(response => {
        dispatch(fetchMoviesSuccess(listType, response))
        return response.data.results
      })
      .catch(error => {
        dispatch(fetchMoviesFailure(error))
      });
  }
}