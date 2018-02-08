import React, { Component } from 'react';
import './displayUsers.css';
import AddUser from './addUser'

class DisplayUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: {
                users: []
            }
        }

        this.updateUsers = this.updateUsers.bind(this);
    }

    componentDidMount() {
        fetch('/users/getUsers')
            .then(res => res.json())
            .catch(function(error) {
                console.log(error);
            })
            .then(users => this.setState({ users }))
            .catch(function(error) {
                console.log(error);
            });
    }

    updateUsers(users) {
        this.setState({ users });
    }

    render() {
        return (
            <div>
            <h1 className="App-title">Create New User</h1>
            <AddUser onSubmit={this.updateUsers} />
        <h1 className="App-title">View all Users</h1>
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
            </div>
        );
    }
}

export default DisplayUsers;
