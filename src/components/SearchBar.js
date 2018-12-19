import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };
    }

    onChange(event) {
        this.setState({ query: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        let path = "/search/" + this.state.query;
        this.setState({query: ''});
        this.props.history.push(path);
    }

    render() {
        return (
            <Row className="searchbar">
                <Col md={9}>
                    <h1><Link to="/">It's SHOW TIME</Link></h1>
                </Col>
                <Col md={3} className="search-form">
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Col md={10}>
                            <FormGroup>
                                <FormControl type="text" placeholder="Find movie" name="search" value={this.state.query} onChange={this.onChange.bind(this)} />
                            </FormGroup></Col>
                        <Col md={2}>
                            <FormGroup>
                                <Button type="submit" className="button"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></Button>
                            </FormGroup></Col>
                    </Form>
                </Col>


            </Row>
        );
    }
}

export default withRouter(SearchBar);