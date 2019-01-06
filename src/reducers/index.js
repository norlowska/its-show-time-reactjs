import { combineReducers } from 'redux';
import { REQUEST_MOVIES, RECEIVE_MOVIES, ERROR_MOVIES, ADD_MOVIE, REMOVE_MOVIE, RATE_MOVIE, SET_SHORTLIST_ORDER, SET_MOVIESLIST_ORDER } from '../actions'
import { USER_MOVIES } from '../constants'

/* manage state of specific movie list (Now Playing, User Movies or Search Results) */
const movies = (state = {
  isFetching: false,
  items: [],
  error: null
},
  action
) => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.movies
      })
    case ERROR_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case REMOVE_MOVIE:
      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== action.movie.id)
      })
    case ADD_MOVIE:
      let alreadyOnList = state.items.some(function (el) {
        return el.id === action.movie.id;
      });
      if (!alreadyOnList) {
        return Object.assign({}, state, {
          items: [...state.items, action.movie]
        })
      }
      return state
    case RATE_MOVIE:
      let updatedItems = state.items.map(item => {
        if (item.id === action.movie.id) {
          return { ...item, rate: action.rate }
        }
        return item
      })
      console.log("UPDATED ITEM",updatedItems)
      return Object.assign({}, state, {
        items: updatedItems
      })
    default:
      return state
  }
}

const moviesLists = (
  state = {},
  action
) => {
  switch (action.type) {
    case REQUEST_MOVIES:
    case RECEIVE_MOVIES:
    case ERROR_MOVIES:
    case ADD_MOVIE:
    case REMOVE_MOVIE:
      return Object.assign({}, state, {
        [action.listType]: movies(state[action.listType], action)
      })
    case RATE_MOVIE:
      return Object.assign({}, state, {
        USER_MOVIES: movies(state[USER_MOVIES], action)
      })
    default:
      return state
  }
}

const listOrder = (state = 'TITLE_ASC', action) => {
  switch (action.type) {
    case SET_MOVIESLIST_ORDER:
      return action.order;
    default:
      return state;
  }
}

const shortListOrder = (state = 'LAST_WATCHED_ASC', action) => {
  switch (action.type) {
    case SET_SHORTLIST_ORDER:
      return action.order;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  moviesLists,
  listOrder,
  shortListOrder
});

export default rootReducer;