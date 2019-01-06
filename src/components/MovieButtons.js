import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, Form } from 'react-bootstrap'
import { addWatchedMovie, removeMovie, rateMovie } from '../actions'

class MovieButtons extends Component {
    constructor(props) {
        super(props);
        this.state = { rate: 10 };
    }

    alreadyOnList(movie) {
        const { userMovies } = this.props;
        return userMovies.some(el => el.id === movie.id)
    }

    alreadyRated(movie) {
        const { userMovies } = this.props;
        return userMovies.some(el => el.id === movie.id && typeof el.rate !== "undefined")
    }

    getRate(movie) {
        const { userMovies } = this.props;
        var result = userMovies.filter(obj => {
            return obj.id === movie.id
          })
        return result[0].rate;
    }

    onChange(event) {
        this.setState({ rate: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.rateMovie(this.props.movie, this.state.rate);
    }

    render() {
        const { movie, userMovies } = this.props;
        if (this.alreadyOnList(movie)) {
            if(typeof this.getRate(movie) !== "undefined"){
                return (
                    <div>
                        <Button className="button movie-button" onClick={() => this.props.removeMovie(movie)}>Delete movie</Button>
                        Your rate: {this.getRate(movie)}
                    </div>  
                )
                
            }
            return (
                <div>
                    <Button className="button movie-button" onClick={() => this.props.removeMovie(movie)}>Delete movie</Button>
                    <Form onSubmit={this.onSubmit.bind(this)} inline>
                        <FormGroup>
                            <FormControl
                                onChange={this.onChange.bind(this)}
                                componentClass="select" placeholder="select">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </FormControl>
                        </FormGroup>
                        <Button type="submit" className="button rate-button">Add rate</Button>
                    </Form>
                </div>
            )
        }
        return <Button className="button movie-button" onClick={() => this.props.addWatchedMovie(movie)}>Add to watched history</Button>

    }
}

MovieButtons.propTypes = {
    movie: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        userMovies: state.moviesLists.USER_MOVIES.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addWatchedMovie: movie => dispatch(addWatchedMovie(movie)),
        removeMovie: movie => dispatch(removeMovie(movie)),
        rateMovie: (movie, rate) => dispatch(rateMovie(movie, rate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons)