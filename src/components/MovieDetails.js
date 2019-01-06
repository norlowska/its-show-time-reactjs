import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import { URL_MOVIE, URL_IMG } from '../constants'
import MovieButtons from './MovieButtons'

const MovieDetails = ({ movie }) => {
    return (
        <div>
            <Col md={2} className="poster-col">
                <a href={`${URL_MOVIE}/${movie.id}`}>
                    {movie.poster_path ? <img src={`${URL_IMG}/w154/${movie.poster_path}`} alt="poster" /> : <img src="https://via.placeholder.com/92x138.jpg" alt="no-poster" />}
                </a>
            </Col>
            <Col md={7} className="info-col">
                <h2 className="title">{movie.original_title} ({movie.release_date.substring(0,4)})</h2>
                <h3>Overview:</h3>
                <p className="overview">{movie.overview}</p>
            </Col>
            <Col md={3} className="buttons-col">
                <MovieButtons movie={movie}></MovieButtons>
            </Col>
        </div >
    )
}

MovieDetails.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MovieDetails