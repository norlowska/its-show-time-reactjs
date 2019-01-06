import React, { Component } from 'react'
import { fetchMovies, removeMovie, setOrder} from '../actions'
import { SHORT_LIST, TITLE_ASC, TITLE_DESC, RELEASE_DATE_ASC, RELEASE_DATE_DESC, LAST_WATCHED_ASC, LAST_WATCHED_DESC, USER_MOVIES } from '../constants'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { URL_MOVIE, URL_IMG, USER_MOVIES_URL } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class UserMoviesShort extends Component {

    componentDidMount() {
        this.props.fetchMovies(USER_MOVIES, null)
    }

    sort(list, order) {
        let sortedList = list;
        switch (order) {
            case TITLE_ASC:
                sortedList.sort((a, b) => (a.original_title > b.original_title) ? 1 : ((b.original_title > a.original_title) ? -1 : 0))
                break
            case TITLE_DESC:
                sortedList.sort((a, b) => (a.original_title < b.original_title) ? 1 : ((b.original_title < a.original_title) ? -1 : 0))
                break
            case RELEASE_DATE_ASC:
                sortedList.sort((a, b) => (a.release_date > b.release_date) ? 1 : ((b.release_date > a.release_date) ? -1 : 0))
                break
            case RELEASE_DATE_DESC:
                sortedList.sort((a, b) => (a.release_date < b.release_date) ? 1 : ((b.release_date < a.release_date) ? -1 : 0))
                break
            case LAST_WATCHED_ASC:
                sortedList = list
                break
            case LAST_WATCHED_DESC:
                sortedList = list.reverse()
                break
            default:
                sortedList = list
        }
        return sortedList;
    }

    render() {
        let { movies, loading, error, listOrder } = this.props
        let lastMovies = this.sort(movies.slice(-6), listOrder)

        if (loading) {
            return (
                <Row className="background-grey">
                    <Col md={12}>
                        <h1>YOUR MOVIES</h1>
                        Loading...
                    </Col>
                </Row>
            )
        } else if (error) {
            return (
                <Row className="background-grey">
                    <Col md={12}>
                        <h1>YOUR MOVIES</h1>
                        ERROR {error}
                    </Col>
                </Row>
            )
        } else if (lastMovies.length < 1) {
            return (
                <Row className="background-grey">
                    <Col md={8} className="col-centered">
                        <h1 className="title text-center">YOUR LAST MOVIES</h1>
                        <div className="text-center">You watched 0 movies</div>
                    </Col>
                </Row>)
        } else {
            return (
                <Row className="user-movies-short background-grey">
                    <Col md={8} className="col-centered">
                        <Row>
                            <h1 className="title text-center">YOUR LAST MOVIES</h1>
                        </Row>
                        <Row>
                            <Col md={6} className="col-centered">
                                <Button className="button button-order" onClick={() => {
                                    if (listOrder === LAST_WATCHED_ASC) {
                                        this.props.setOrder(LAST_WATCHED_DESC, SHORT_LIST)
                                    } else {
                                        this.props.setOrder(LAST_WATCHED_ASC, SHORT_LIST)
                                    }
                                }}>Last watched</Button>
                                <Button className="button button-order" onClick={() => {
                                    if (listOrder === TITLE_ASC) {
                                        this.props.setOrder(TITLE_DESC, SHORT_LIST)
                                    } else {
                                        this.props.setOrder(TITLE_ASC, SHORT_LIST)
                                    }
                                }}>Title</Button>
                                <Button className="button button-order" onClick={() => {
                                    if (listOrder === RELEASE_DATE_ASC) {
                                        this.props.setOrder(RELEASE_DATE_DESC, SHORT_LIST)
                                    } else {
                                        this.props.setOrder(RELEASE_DATE_ASC, SHORT_LIST)
                                    }
                                }}>Release date</Button>
                                <a href={USER_MOVIES_URL}><Button className="button button-order button-last">Show All</Button></a>
                            </Col>
                        </Row>
                        <Row>
                            {lastMovies.map(movie =>
                                <Col md={2} key={movie.id}>
                                    <a href={`${URL_MOVIE}/${movie.id}`}>
                                        {movie.poster_path ? <img src={`${URL_IMG}/w154/${movie.poster_path}`} alt="poster" /> : <img src="https://via.placeholder.com/92x138.jpg" alt="no-poster" />}
                                    </a>
                                    <h4 className="text-center">{movie.original_title}</h4>
                                    <div className="text-center">{movie.release_date}</div>
                                    <div className="text-center">
                                        <Button className="button remove-button" onClick={() => this.props.removeMovie(movie)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            )
        }

    }
}

const mapStateToProps = state => {
    const { shortListOrder, moviesLists } = state
    const { isFetching, items, error } = moviesLists.USER_MOVIES || {
        isFetching: true,
        items: [],
        error: null
    }
    return {
        movies: items,
        loading: isFetching,
        error: error,
        listOrder: shortListOrder
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMovies: () => dispatch(fetchMovies(USER_MOVIES, null)),
        removeMovie: movie => dispatch(removeMovie(movie)),
        setOrder: (order, listType) => dispatch(setOrder(order, listType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMoviesShort)