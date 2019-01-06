import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesList from './MoviesList';
import { fetchMovies } from '../actions';
import { SEARCH_RESULTS } from '../constants'
import { Row, Col } from 'react-bootstrap'

class SearchResults extends Component {

    componentDidMount() {
        this.params = new URLSearchParams(this.props.location.search);
        this.props.fetchMovies(SEARCH_RESULTS,  this.params.get('title'));
    }

    componentDidUpdate(prevProps) {
        let prevParams = new URLSearchParams(prevProps.location.search);
        let newParams = new URLSearchParams(this.props.location.search);
        if (prevParams.get('title') !== newParams.get('title')) {
            this.params = newParams;
            this.props.fetchMovies(SEARCH_RESULTS,  newParams.get('title'));
          }
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
                    <h1 className="text-center">Search results for: {this.params.get('title')}</h1>
                    <MoviesList movies={movies} />
                </Col>
            </Row>)
    }
}
const mapStateToProps = state => {
    const { listOrder, moviesLists } = state
    const { isFetching, items, error } = moviesLists.SEARCH_RESULTS || {
        isFetching: true,
        items: [],
        error: null
    }
    return {
        movies: items,
        loading: isFetching,
        error: error,
        listOrder: listOrder
    };
};

export default connect(mapStateToProps, { fetchMovies })(SearchResults);