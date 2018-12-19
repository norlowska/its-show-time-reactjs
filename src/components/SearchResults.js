import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
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
                t.setState({results: success.data.results}, () => console.log(t.state.results));
            });
    }

    render() { 
        return ( <Row></Row> );
    }
}

export default SearchResults;