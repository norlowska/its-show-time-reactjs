import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import CustomForm from './CustomForm';
import { auth } from '../firebase/firebase';
import { SIGN_IN } from '../constants/routes';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwordone: '',
            passwordtwo: '',
            success: false
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        let t = this;
        const { email, passwordone, passwordtwo} = this.state;
        if (!email || !passwordone || !passwordtwo ||
            !(passwordone === passwordtwo) || !(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
            alert("Wrong registration data. All fields are required. Password and password confirmation must be the same")
        } else {
            auth.signup(email, passwordone);
            t.setState({ success: true, email: '', passwordone: '', passwordtwo: '' });
        }

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
                <h4>Hooray! Your account was successfully created! <a href={SIGN_IN}>Sign in</a></h4></Alert>) : ""}
                    <CustomForm fields={[
                        { type: "email", label: "E-mail address", id: "email", value: this.state.email },
                        { type: "password", label: "Password", id: "passwordone", value: this.state.passwordone },
                        { type: "password", label: "Confirm password", id: "passwordtwo", value: this.state.passwordtwo }
                    ]} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)}></CustomForm>
                </Col>
            </Row>
        );
    }
}

export default SignUp;