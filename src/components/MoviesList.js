import React, { Component } from 'react';
import _ from 'lodash';
import { URL_MOVIE, URL_IMG } from '../constants/constants';

class MoviesList extends Component {

    componentDidMount(){

    }

    render() {
        if (!this.props.movies) {
            return <div></div>
        }

        const movieItems = _.map(this.props.movies, movie => {
            return (
                <li class="movie-details">
                    <div class="col1">
                        <a href={`${URL_MOVIE}/${movie.id}`}>
                            <img src={`${URL_IMG}/w92/${movie.poster_path}`} alt="poster" />
                            {/* napisać alternatywny: src="https://via.placeholder.com/92x138.jpg" */}
                        </a>
                    </div>
                    <div class="col2">
                        <h1>{movie.original_title}</h1>
                        <h2>Overview:</h2>
                        <p class="overview">{movie.overview}</p>

                        <div class="details">
                            <h2>Directors: </h2>
                            <ul class="directors-list">
                                {/* {movie.direcotrs...} */}
                            </ul>
                        </div>

                    </div>
                </li>
            )
        });

        return (
            <ul className="movies-list">
                {movieItems}
            </ul>
        )
    }
};

export default MoviesList;