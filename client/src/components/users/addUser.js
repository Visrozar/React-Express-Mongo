import React, { Component } from 'react';
import './addUser.css';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            jobTitle: '',
            email: '',
            resume: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event) {
        const { onSubmit } = this.props;

        console.log('A name was submitted: ' + this.state.name);
        console.log('Selected file: ' + this.fileInput.files[0].name);
        this.fileUpload(this.fileInput.files[0])
            .then(response => response.json())
            .catch(response => response.json())
            .then(function (response) {
                if (response.success) {
                    onSubmit(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    fileUpload(file) {
        let form = new FormData();
        form.append('resume', file);
        form.append('name', this.state.name);
        form.append('phone', this.state.phone);
        form.append('jobTitle', this.state.jobTitle);
        form.append('email', this.state.email);
        return fetch('/users/uploadResume', {
            method: 'POST',
            body: form
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="card">
                <p> <label>
                    Name:
              <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={e => this.handleChange(e)} required />
                </label> </p>
                <p> <label>
                    Phone Number:
              <input name="phone" type="number" placeholder="Phone Number" value={this.state.phone} onChange={e => this.handleChange(e)} required />
                </label></p>
                <p><label>
                    Job Title:
              <input name="jobTitle" type="text" placeholder="Job Title" value={this.state.jobTitle} onChange={e => this.handleChange(e)} required />
                </label></p>
                <p><label>
                    Email:
              <input name="email" type="email" placeholder="Email (needs to be unique)" value={this.state.email} onChange={e => this.handleChange(e)} required />
                </label></p>
                <p><label>
                    Upload Resume:
                        <input
                        type="file"
                        ref={input => {
                            this.fileInput = input;
                        }}
                        required />
                </label></p>
                <input className="button" type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddUser;
