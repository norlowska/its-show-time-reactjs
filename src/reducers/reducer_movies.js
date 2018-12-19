import {FETCH_NOWPLAYING, FETCH_MOVIE, FETCH_MOVIES} from '../actions/FetchMovies';
import _ from 'lodash';

export default function (state = [], action) {
  switch(action.type) {
    case FETCH_NOWPLAYING:
        return action.payload.data.results.slice(0,9);
    case FETCH_MOVIES:
      return action.payload.data.results.slice(0,9);
    case FETCH_MOVIE:
      const stateObjects = _.mapKeys(state, 'id');
      delete stateObjects[action.payload.data.id];
      return {[action.payload.data.id] : action.payload.data ,...stateObjects};
    default:
      return state;
  }
}