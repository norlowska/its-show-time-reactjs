import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { fetchNowPlaying } from '../actions/FetchMovies';

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
        if (!movies) {
            return (<div></div>);
        }
        const movieItems = movies.map(movie => {
            return (
                <li className="list-group-item" key={movie.id}>
                    {movie.title}
                </li>
            );
        });
        return (
            <ul className="list-group np-list">
                {movieItems}
            </ul>
        )
    }
};

function mapStateToProps({ movies }){
    return { movies };
  };
  
export default connect(mapStateToProps, {fetchNowPlaying})(NowPlaying);