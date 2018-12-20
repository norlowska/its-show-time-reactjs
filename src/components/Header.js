import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { HOME, SIGN_IN, USER_MOVIES } from '../constants/routes';
import { auth } from '../firebase/firebase';

const signOut = () => {
    auth.signOut();
}

const Header = () => {
    var authUser = auth.currentUser;
    return(
        authUser ? <HeaderAuth /> : <HeaderNonAuth />
    );
};

const HeaderAuth = ({ authUser }) => (
    <Row className="navbar">
        <div>
            <Col md={1}>
                <Link to={HOME}>Home</Link>
            </Col>
            <Col md={1}>
                <Link to={USER_MOVIES}>Your movies</Link>
            </Col>
            <Col md={9}></Col>
            <Col md={1}>
                <Button className="button" onClick={signOut}>Sign out</Button>
            </Col>
        </div>
    </Row>
);

const HeaderNonAuth = () => (
    <Row className="navbar">
        <div>
            <Col md={1}>
                <Link to={HOME}>Home</Link>
            </Col>
            <Col md={10}></Col>
            <Col md={1}>
                <a href={SIGN_IN}><Button className="button">Sign in</Button></a>
            </Col>
        </div>
    </Row>
);

export default Header;