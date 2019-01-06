//api urls
export const API_KEY = 'api_key=07fa2cb44a9888f1a8ab8c9b1170d593';
export const API_URL = 'https://api.themoviedb.org/3'
export const URL_MOVIE = 'https://www.themoviedb.org/movie';
export const URL_SEARCH = API_URL + '/search/movie?query=';
export const URL_NP = API_URL + '/movie/now_playing?' + API_KEY;
export const URL_IMG = 'https://image.tmdb.org/t/p/';

//routes
export const HOME = '/';
export const USER_MOVIES_URL = '/user-movies';
export const SEARCH = '/search';

//order values
export const TITLE_ASC = 'TITLE_ASC'
export const TITLE_DESC = 'TITLE_DESC'
export const RELEASE_DATE_ASC = 'RELEASE_DATE_ASC'
export const RELEASE_DATE_DESC = 'RELEASE_DATE_DESC'
export const LAST_WATCHED_ASC = 'LAST_WATCHED_ASC'
export const LAST_WATCHED_DESC = 'LAST_WATCHED_DESC'

//list type values
export const NOW_PLAYING = 'NOW_PLAYING'
export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const USER_MOVIES = 'USER_MOVIES'
export const SHORT_LIST = 'SHORT_LIST'
export const MOVIES_LIST = 'MOVIES_LIST'