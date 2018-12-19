import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Grid } from 'react-bootstrap';
import Header from './components/Header';
import NowPlaying from './components/NowPlaying';
import SignIn from './components/SignIn';
import SignUp from './components/SingUp';
import PasswordForget from './components/PasswordForget';
import UserMovies from './components/UserMovies';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer'
import * as ROUTES from './constants/routes';
import { auth } from './firebase/firebase';
import './App.css';

function PrivateRoute({ component: Component, authUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authUser !== null) ? <Component {...props} />
        : <Redirect to={{ pathname: '/signin' }} />}
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
      } else {
        this.setState({ authUser: null });
      }
    });
  }

  render() {
    return (
        <Router>
          <Grid fluid className="App">
            <SearchBar />
            <Header authUser={this.state.authUser} />
            <Route exact path={ROUTES.HOME} component={NowPlaying} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
            <PrivateRoute authUser={this.state.authUser} path={ROUTES.USER} component={UserProfile} />
            <PrivateRoute authUser={this.state.authUser} path={ROUTES.USER_MOVIES} component={UserMovies} />
            <Footer></Footer>
          </Grid>
        </Router>
    );
  }
}

export default App;
