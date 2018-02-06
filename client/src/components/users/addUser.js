import React, { Component } from 'react';
import './addUser.css';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            jobType: '',
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
        console.log('A name was submitted: ' + this.state.name);
        console.log('Selected file: ' + this.fileInput.files[0].name);
        // if (this.fileInput.files.length) {
        //     this.fileUpload(this.fileInput.files[0]).then((response)=>{
        //         console.log(response.data);
        //       })
        // }

        let form = new FormData();
        form.append('triangle.jpeg', this.fileInput.files[0]);

        fetch('https://file.io', { // Your POST endpoint
            method: 'POST',
            body: form // This is the content of your file
        }).then(
            response => response.json() // if the response is a JSON object
            );
        event.preventDefault();
    }

    fileUpload(file) {
        const url = 'https://file.io';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return fetch(url, formData, config)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* <label>
                    Name:
              <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={e => this.handleChange(e)} required />
                </label>
                <label>
                    Phone Number:
              <input name="phone" type="number" placeholder="Phone Number" value={this.state.phone} onChange={e => this.handleChange(e)} required />
                </label>
                <label>
                    Job Type:
              <input name="jobType" type="text" placeholder="Job Type" value={this.state.jobType} onChange={e => this.handleChange(e)} required />
                </label>
                <label>
                    Email:
              <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={e => this.handleChange(e)} required />
                </label> */}
                <label>
                    Upload file:
          <input
                        type="file"
                        ref={input => {
                            this.fileInput = input;
                        }}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddUser;
