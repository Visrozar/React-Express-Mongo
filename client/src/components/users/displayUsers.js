import React, { Component } from 'react';
import './displayUsers.css';

class DisplayUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: {
                users: []
            }
        }
    }

    componentDidMount() {
        fetch('/users/getUsers')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div>
                {this.state.users.users.map(user =>
                    <div key={user._id} className="card">
                        <h1>{user.name}</h1>
                        <p className="title">{user.jobTitle}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p><a href={'http://localhost:8080/'+user.resume} download>Resume</a></p> 
                        {/* This can defintely be improved */}
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayUsers;
