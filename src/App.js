import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from 'react-bootstrap';
import Header from './components/Header';
import NowPlaying from './components/NowPlaying';
import SignIn from './components/SignIn';
import SignUp from './components/SingUp';
import PasswordForget from './components/PasswordForget';
import UserFilms from './components/UserFilms';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer'
import * as ROUTES from './constants/routes';
import { auth } from './firebase/firebase';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

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
      <Provider store={store}>
        <Router>
          <Grid fluid className="App">
            <SearchBar />
            <Header authUser={this.state.authUser} />
            <Route exact path={ROUTES.HOME} component={NowPlaying} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
            <Route path={ROUTES.USER} component={UserProfile} />
            <Route path={ROUTES.USER_WATCHLIST} component={UserFilms} />
            <Footer></Footer>
          </Grid>

        </Router>
      </Provider>
    );
  }
}

export default App;
