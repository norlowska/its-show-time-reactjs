import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HOME, SEARCH } from '../constants';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    onChange(event) {
        this.setState({ title: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        let path = SEARCH + '?title=' + this.state.title;
        console.log(path)
        console.log(this.props.history)
        this.props.history.push(path);
    }

    render() {
        return (
            <Row className="header">
                <Col md={9}>
                    <h1><a href={HOME}>It's SHOW time</a></h1>
                </Col>
                <Col md={3} className="search-form">
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Col md={10}>
                            <FormGroup>
                                <FormControl type="text" placeholder="Find movie" name="search" value={this.state.title} onChange={this.onChange.bind(this)} />
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

export default withRouter(Header);