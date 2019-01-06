import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions'
import { NOW_PLAYING } from '../constants'
import MoviesList from './MoviesList'
import { Row, Col } from 'react-bootstrap'

class NowPlaying extends Component {
    componentDidMount() {
        this.props.fetchMovies(NOW_PLAYING, null)
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
                    <h1 className="text-center">Now playing</h1>
                    <MoviesList movies={movies} />
                </Col>
            </Row>)
    }
};

const mapStateToProps = state => {
    const { moviesLists } = state
    const { isFetching, items, error } = moviesLists.NOW_PLAYING || {
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

export default connect(mapStateToProps, { fetchMovies })(NowPlaying)