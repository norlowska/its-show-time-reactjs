import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNowPlaying } from '../actions/FetchMovies';
import MoviesList from './MoviesList';

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.fetchNowPlaying();
    }

    render() {
        const movies = this.props.movies;
        return <MoviesList movies={this.props.movies}></MoviesList>;
    }
};

function mapStateToProps({ movies }){
    return { movies };
  };
  
export default connect(mapStateToProps, {fetchNowPlaying})(NowPlaying);