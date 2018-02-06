import React, { Component } from 'react';
import './users.css';

class Users extends Component {
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
            .then(users => this.setState({ users }, () => console.log('Users fetched..', users)));
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
                        <p><button>Resume</button></p>
                    </div>
                )}
            </div>
        );
    }
}

export default Users;
