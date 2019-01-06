import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions'
import { USER_MOVIES } from '../constants'
import MoviesList from './MoviesList'
import { Row, Col } from 'react-bootstrap'

class UserMovies extends Component {

    componentDidMount() {
        this.props.fetchMovies(USER_MOVIES, null)
    }

    render() {
        const { movies, loading, error } = this.props
        if (error) {
            return <div>Error! {error}</div>
        }

        if (loading) {
            return <div>Loading...</div>
        }

        return (
        <Row>
            <Col md={8} className="col-centered">
                <h1 className="text-center">Your watched movies</h1>
                <MoviesList movies={movies} />
            </Col>
        </Row>)
    }
}
 
const mapStateToProps = state => {
    const { moviesLists } = state
    const { isFetching, items, error } = moviesLists.USER_MOVIES || {
        isFetching: true,
        items: [],
        error: null
    }
    return {
        movies: items,
        loading: isFetching,
        error: error,
    };
};

export default connect(mapStateToProps, { fetchMovies })(UserMovies)