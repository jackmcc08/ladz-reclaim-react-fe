import React, { Component } from 'react';
import axios from 'axios'
// import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: ''
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })
      };

    handleSubmit = (event) => {
        event.preventDefault()
      };

    render() {
        const {username, password} = this.state
        return (
          <div>
            <h1>Log In</h1>
              <form onSubmit={this.handleSubmit}>
              <input
                placeholder="username"
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <input
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <button placeholder="submit" type="submit">
                Log In
              </button>
         </form>
      </div>
    );
  }
}

function LoginButton(props) {
  return (
    <button
      className="loginButton"
    >
      Login
    </button>
  )
}

function SignUpButton(props) {
  return (
    <button
      className="signUpButton"
    >
      Sign Up
    </button>
  )
}

export default Login;
export { LoginButton, SignUpButton };


// Click Login BUtton
// displays form
// Enter form username & password
// Click Submit
// Routes to Session creator
// api pings back yes or no
// Session created - now logged in
