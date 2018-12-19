import axios from 'axios';
import { URL_NP, API_KEY, URL_MOVIE, URL_SEARCH } from '../constants/constants';
export const FETCH_MOVIES = 'fetch_movies';
export const FETCH_MOVIE = 'fetch_movie';
export const FETCH_CREDITS = 'fetch_credits';
export const FETCH_NOWPLAYING = 'fetch_nowPlaying';

export function fetchMovies(title) {
    const request = axios.get(`${URL_SEARCH}${title}&${API_KEY}&include_adult=false`);
    return {
      type: FETCH_MOVIES,
      payload: request
    }
  }
  
  export function fetchMovie(movie_id) {
    const request = axios.get(`${URL_MOVIE}/${movie_id}?${API_KEY}`);
    
    return {
      type: FETCH_MOVIE,
      payload: request
    }
  }
  
  export function fetchCredits(movie_id) {
    const request = axios.get(`${URL_MOVIE}/${movie_id}/credits?${API_KEY}`);
  
    return {
      type: FETCH_CREDITS,
      payload: request
    }
  }

export function fetchNowPlaying() {
    const request = axios.get(`${URL_NP}${API_KEY}`);
    return {
        type: FETCH_NOWPLAYING,
        payload: request
    }
}