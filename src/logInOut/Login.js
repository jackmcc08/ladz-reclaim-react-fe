import React, { Component } from 'react';
import { authenticateUser } from '../api/logInOutApiInterface.js';

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

  handleLoginFormSubmit = (event) => {
    event.preventDefault();
    authenticateUser(this.state.username, this.state.password).then((response) => {
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      this.props.onClick(response.data)
    })
  };

  render() {
    return (
      <div>
        <h4 className="login-title">Welcome</h4>
        <form onSubmit={ this.handleLoginFormSubmit }>
          <input
            className="login-form"
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            className="login-form"
            placeholder="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <button className="login-button" placeholder="submit" type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
