import React, { Component } from 'react';
import _ from 'lodash';
import { URL_MOVIE, URL_IMG } from '../constants/constants';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';


class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = { moviesList: [],
        //currentUser: null 
    };
    }

    componentDidMount() {
        let list = this.moviesList();
       /* if(auth.currentUser) {
            db.user(auth.currentUser.uid)
            .once("value")
            .then((snapshot) => {
                this.setState({currentUser: snapshot.val()});
              });
        }
*/
        this.setState({ moviesList: list });
    }

    componentDidUpdate(prevProps) {
        var prevMovies = prevProps.movies;
        var movies = this.props.movies;
        if(!_.isEqual(prevMovies.sort(), movies.sort())) {
            let list = this.moviesList();
            this.setState({ moviesList: list });
        }
        /*if(auth.currentUser) {
            db.user(auth.currentUser.uid)
            .once("value")
            .then((snapshot) => {
                this.setState({currentUser: snapshot.val()});
              });
        }*/
    }

    /*addMovie(movieId) {
        let user = this.state.currentUser;
        user.movies.push({ id: movieId});
        db.user(this.state.currentUser.uid)
        .update(user)
        .once('value').then(function(snapshot) {
            user = snapshot.val();
            user.movies.push({id: movieId});
          });
          console.log(user);
    }*/

    moviesList = () => {
        let movies = this.props.movies;
        let list = movies.map(movie =>
            <Col md={12} className="movie-details" key={movie.id}>
                <Col md={3} className="col1">
                    <a href={`${URL_MOVIE}/${movie.id}`}>
                        {movie.poster_path ? <img src={`${URL_IMG}/w92/${movie.poster_path}`} alt="poster" /> : <img src="https://via.placeholder.com/92x138.jpg" alt="no-poster" />}
                    </a>
                </Col>
                <Col md={9} className="col2">
                    <h1>{movie.original_title}</h1>
                    <h2>Overview:</h2>
                    <p className="overview">{movie.overview}</p>
                </Col>
            </Col>
        );

        return list;
    }

    render() {
        var movies = this.state.moviesList;
        if (!movies) {
            return <div></div>;
        }

        return (
            <Row>
                <Col md={8} className="col-centered ">
                {movies}
                </Col>
            </Row>
        )
    }
};

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MoviesList;