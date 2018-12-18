import React, { Component } from 'react';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <p>User id: {this.props.match.params.id}</p> );
    }
}
 
export default UserProfile;