import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, FormGroup } from 'react-bootstrap';
import { URL_SEARCH, API_KEY } from '../constants/constants';
import axios from 'axios';
import AutoSuggestion from 'react-autosuggest';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: [] };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let component = this;
        axios.get(URL_SEARCH + event.target.value + '&' + API_KEY)
            .then(function (response) {
                component.setState({ searchResults: response.data.results }, () => { console.log(component.state.searchResults) });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getSuggestionValue(suggestion) {
        return suggestion.title;
    };

    renderSuggestion(suggestion, { query }) {
        return (
            <p>
               {/* <img className="searchResult-image" src={suggestion.img == null ? logo : URL_IMG + IMG_SIZE_XSMALL + suggestion.img} />*/}
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.year}
                </div>
            </p>
        )
    };



    render() {
        return (
            <Row className="searchbar">
                <Col md={9}>
                    <h1><Link to="/">It's SHOW TIME</Link></h1>
                </Col>
                <Col md={3}>
                    <Form >
                        <FormGroup>
                            {/*<AutoSuggestion></AutoSuggestion>*/}
                        </FormGroup>
                    </Form>
                </Col>


            </Row>
        );
    }
}

export default SearchBar;