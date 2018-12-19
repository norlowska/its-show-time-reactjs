import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row } from 'react-bootstrap';
import { fetchNowPlaing } from '../actions/FetchMovies';

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        if (!this.props.movies) {
            return (<div></div>);
        }
        console.log(this.props.movies);
        const movieItems = _.map(this.props.movies, movie => {
            return (
                <li className="list-group-item">
                    {movie.title}
                </li>
            );
        });
        return (
            <ul className="list-group">
                {movieItems}
            </ul>
        )
    }
};

function mapStateToProps({ movies }){
    return { movies };
  };
  
export default connect(mapStateToProps, {fetchNowPlaing})(NowPlaying);