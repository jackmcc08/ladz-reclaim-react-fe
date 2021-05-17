import React from 'react';
import {
  withRouter
} from 'react-router-dom'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    }
  }

  // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l - thanks to this blog for detailing the withRouter function and getting the redirect on form submission to work!
  signupUser = (event) => {
    event.preventDefault();
    this.props.history.push('/');
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <h4>Signup</h4>
        <form onSubmit={ this.signupUser }>
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


export default withRouter(Signup);
export { SignupButton };
