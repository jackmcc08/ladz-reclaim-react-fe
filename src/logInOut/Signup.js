import React from 'react';
import {
  withRouter
} from 'react-router-dom'
import {
  createUser,
  // createSession,
  authenticateUser
} from '../api/logInOutApiInterface.js'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }
  // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l - thanks to this blog for detailing the withRouter function and getting the redirect on form submission to work!
  handleSignupFormSubmit = (event) => {
    event.preventDefault();
    createUser(this.state.username, this.state.password).then((response) => {
      authenticateUser(this.state.username, this.state.password).then((response) => {
        const token = response.data.auth_token;
        localStorage.setItem('token', token);
        this.props.onClick(response.data);
        this.props.history.push('/');
      })
    });

  }

  render() {
    return (
      <div className="login-div">
        <h4 className="login-title">Create an account</h4>
        <form onSubmit={ this.handleSignupFormSubmit }>
          <input
            className="login-form"
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />
          <br></br>
          <input
            className="login-form"
            placeholder="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <br></br>
          <button className="login-button" placeholder="submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(Signup);
