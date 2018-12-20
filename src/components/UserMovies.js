import React, { Component } from 'react';
import { auth, db } from 'firebase';

class UserMovies extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount() {
        console.log(auth.currentUser);
        if(auth.currentUser) {
            db.user(auth.currentUser.uid)
            .once("value")
            .then((snapshot) => {
                this.setState({currentUser: snapshot.val()});
              });
        }
    }
    render() { 
        return (  <div></div> );
    }
}
 
export default UserMovies;