import { FETCH_CREDITS } from '../actions/FetchMovies';

export default function (state = null, action) {
  switch(action.type) {
    case FETCH_CREDITS:
      const cast = action.payload.data.cast.slice(0,5);
      const crew = action.payload.data.crew.slice(0,10);
      const id = action.payload.data.id;
      return {id, cast, crew};
    default:
      return state;
  }
}