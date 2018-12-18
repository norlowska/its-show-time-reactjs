import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false
        };
    }

    render() {
        return(
        <Row>
            <FormGroup>
                <Col md={4}><ControlLabel>{this.props.label}</ControlLabel></Col>
                <Col md={8}><FormControl type={this.props.type} id={this.props.id} value={this.props.defaultValue} onChange={this.props.onChange}></FormControl></Col>
            </FormGroup>
        </Row>
        );
    }
}

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
    id: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default Input;