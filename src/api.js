import axios from 'axios';
import { API_URL, API_KEY } from './Constants';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});