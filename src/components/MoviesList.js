import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { addWatchedMovie, setOrder } from '../actions'
import { MOVIES_LIST, TITLE_ASC, TITLE_DESC, RELEASE_DATE_ASC, RELEASE_DATE_DESC } from '../constants'
import { connect } from 'react-redux';
import MovieDetails from './MovieDetails';

class MoviesList extends Component {
    sort(list, order) {
        let sortedList = list;
        switch (order) {
            case TITLE_ASC:
                sortedList.sort((a, b) => (a.original_title > b.original_title) ? 1 : ((b.original_title > a.original_title) ? -1 : 0))
                break
            case TITLE_DESC:
                sortedList.sort((a, b) => (a.original_title < b.original_title) ? 1 : ((b.original_title < a.original_title) ? -1 : 0))
                break
            case RELEASE_DATE_ASC:
                sortedList.sort((a, b) => (a.release_date > b.release_date) ? 1 : ((b.release_date > a.release_date) ? -1 : 0))
                break
            case RELEASE_DATE_DESC:
                sortedList.sort((a, b) => (a.release_date < b.release_date) ? 1 : ((b.release_date < a.release_date) ? -1 : 0))
                break
            default:
                sortedList = list;
        }
        return sortedList;
    }

    render() {
        const movies = this.props.movies;
        const order = this.props.listOrder;
        let sortedMovies = this.sort(movies, order);

        return (
            <div>
                <Row>
                    <Col md={4} className="col-centered">
                        <Button className="button button-order" onClick={() => {
                            if (order === TITLE_ASC) {
                                this.props.setOrder(TITLE_DESC, MOVIES_LIST)
                            } else {
                                this.props.setOrder(TITLE_ASC, MOVIES_LIST)
                            }
                        }}>Title</Button>
                        <Button className="button button-order" onClick={() => {
                            if (order === RELEASE_DATE_ASC) {
                                this.props.setOrder(RELEASE_DATE_DESC, MOVIES_LIST)
                            } else {
                                this.props.setOrder(RELEASE_DATE_ASC, MOVIES_LIST)
                            }
                        }}>Release date</Button>
                    </Col>
                </Row>
                <Row>
                    {sortedMovies.map(movie => 
                        <Col md={12} className="movie-details" key={movie.id}>
                            <MovieDetails movie={movie} />
                        </Col>)
                    }
                </Row>
            </div>
        )
    }
};

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    const { listOrder } = state;
    return { listOrder };
};

const mapDispatchToProps = dispatch => {
    return {
        addWatchedMovie: movie => dispatch(addWatchedMovie(movie)),
        setOrder: order => dispatch(setOrder(order))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviesList);