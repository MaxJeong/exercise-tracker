import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        //Must call super for all React component classes that have a constructor
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //This is how you declare variables in React
        this.state = {
            username: '',
        }
    }

    //target is the textbox and the value is the value in the textbox
    //this method will set the value of username to the value in the textbox
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        //prevents the default html form submit behaviour
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        //sends a post request to the backend endpoint
        axios.post('/users/add', user)
            .then(res => console.log(res.data));

        //set username to blank so user can type in a new username
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}