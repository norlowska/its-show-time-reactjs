import React, { Component } from 'react';
import _ from 'lodash';
import MoviesList from './MoviesList';
import { URL_SEARCH, API_KEY } from '../constants/constants';
import axios from 'axios';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        let t = this;
        axios.get(`${URL_SEARCH}${params.query}&${API_KEY}&include_adult=false`)
            .then(function(success) {
                t.setState({results: success.data.results});
            });
    }

    componentDidUpdate(prevProps) {
        const { match: { params } } = this.props;
        let t = this;
        var prevQuery = prevProps.query;
        var query = params.query;
        if(prevQuery !== query) {
            axios.get(`${URL_SEARCH}${params.query}&${API_KEY}&include_adult=false`)
            .then(function(success) {
                t.setState({results: success.data.results});
            });
        }
    }

    render() { 
        return ( <MoviesList movies={this.state.results}></MoviesList> );
    }
}

export default SearchResults;