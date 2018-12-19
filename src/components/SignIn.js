import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import CustomForm from './CustomForm';
import { auth } from '../firebase/firebase';
import { SIGN_UP } from '../constants/routes';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            success: ''
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        let t = this;
        const { email, password } = this.state;
        auth.signin(email, password);
        t.setState({success: true, email: '', password: ''});
    }

    onChange = (values) => {
        for (var key in values) {
            this.setState({ [key]: values[key] });
        }
    }

    render() {
        return (
            <Row>
                <Col md={7} className="col-centered custom-form">
                    {this.state.success ? (<Alert bsStyle="success" className="success-signup">
                        <h4>Hooray! You are now logged in</h4></Alert>) : ""}
                    <CustomForm fields={[
                        { type: "email", label: "E-mail address", id: "email", value: this.state.email },
                        { type: "password", label: "Password", id: "password", value: this.state.password }
                    ]} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)}></CustomForm>
                    <span className="signup-link">Need an account? <Link to={SIGN_UP}>Sign up</Link></span>
                </Col>
            </Row>
        );
    }
}

export default SignIn;