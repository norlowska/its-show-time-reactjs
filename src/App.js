import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from 'react-bootstrap';
import NowPlaying from './components/NowPlaying';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer'
import { HOME, SEARCH, USER_MOVIES_URL } from './constants';
import './App.css';
import Header from './components/Header';
import UserMoviesShort from './components/UserMoviesShort';
import UserMovies from './components/UserMovies';

class App extends Component {

  render() {
    return (
        <Router>
          <Grid fluid className="App">
            <Header />
            <UserMoviesShort />
            <Route exact path={HOME} component={NowPlaying} />
            <Route path={SEARCH} component={SearchResults} />
            <Route path={USER_MOVIES_URL} component={UserMovies} />
            <Footer></Footer>
          </Grid>
        </Router>
    );
  }
}

export default App;
