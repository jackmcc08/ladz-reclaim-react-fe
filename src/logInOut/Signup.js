import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  // redirect does not work!
  redirectHome() {
    return (
      <Redirect to="/" />
    )
  }

  render() {
    return (
      <div>
        <h4>Signup</h4>
        <form onSubmit={event => {
          event.preventDefault();
          this.redirectHome();
          // reset of props does not work - need to look at binding as could be an issue
          this.props.onClick();
          }}>
          <input
            placeholder="username"
            type="text"
            name="username"
            // value={username}
            // onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            // value={password}
            // onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Signup
          </button>
        </form>
      </div>
    )
  }
}



function SignupButton(props) {
  return (
    <button
      className="signUpButton"
    >
      Sign Up
    </button>
  )
}


export default Signup;
export { SignupButton };
