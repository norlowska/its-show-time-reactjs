import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SIGN_IN } from '../constants/routes';
import { auth } from '../firebase/firebase';

const signOut = () => {
    auth.signOut()
    .then(() => {

    })
}

const Header = ({ authUser }) => (
    <div>{authUser ? <HeaderAuth /> : <HeaderNonAuth />}</div>
);

const HeaderAuth = ({ firebase }) => (
    <Row className="navbar">
        <div>
            <Col md={1}>
                <Link to="/">Home</Link>
            </Col>
            <Col md={9}></Col>
            <Col md={1}>
                <Button className="button" onClick={signOut}>Sign out</Button>
            </Col>
            <Col md={1}>
                <Link to="/"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Link>
            </Col>
        </div>
    </Row>
);

const HeaderNonAuth = () => (
    <Row className="navbar">
        <div>
            <Col md={1}>
                <Link to="/">Home</Link>
            </Col>
            <Col md={9}></Col>
            <Col md={1}>
                <a href={SIGN_IN}><Button className="button">Sign in</Button></a>
            </Col>
            <Col md={1}>
                <Link to="/"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Link>
            </Col>
        </div>
    </Row>
);

export default Header;