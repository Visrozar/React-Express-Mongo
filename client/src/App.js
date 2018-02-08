import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayUsers from './components/users/displayUsers'
import AddUser from './components/users/addUser'

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my React-Express-Mongo App</h1>
        </header>

        <h1 className="App-title">Create User</h1>
        <AddUser />
        
        <h1 className="App-title">View all Users</h1>
        <DisplayUsers />
      </div>
    );
  }
}

export default App;
