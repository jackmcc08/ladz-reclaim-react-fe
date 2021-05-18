import React from 'react';
import {
  withRouter
} from 'react-router-dom'
import {
  createUser,
  createSession
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
  signupUser = (event) => {
    event.preventDefault();
    createUser(this.state.username, this.state.password).then((response) => {
      createSession(this.state.username, this.state.password).then((response) => {
        console.log(response.data)
        this.props.onClick(response.data);
        this.props.history.push('/');
      })
    });

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
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
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
