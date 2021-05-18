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
      this.props.onClick(response.data)
    })
  };

  render() {
    return (
      <div>
        <h4>Log In</h4>
        <form onSubmit={ this.handleLoginFormSubmit }>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
