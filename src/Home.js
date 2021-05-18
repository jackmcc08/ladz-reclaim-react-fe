import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './logInOut/Login.js';
import Signup from './logInOut/Signup.js';
import {LogoutButton} from './logInOut/Logout.js'
import App from './App';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userID: null,
      userName: null,
      token: null,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
  }

  handleLoginSubmit(data) {
    this.setState({
      loggedIn: true,
      token: data.auth_token,
      userID: data.user_id,
      userName: data.username,
    });
  }

  handleLogoutSubmit() {
    this.setState({
      loggedIn: false,
      userID: null,
      userName: null,
    })
  }

  handleSignupSubmit(data) {
    this.setState({
      loggedIn: true,
      userID: data.user_id,
      userName: data.user,
    });

  }

  welcomeDisplay() {
    if (this.state.loggedIn) {
      return (
        <div>
          <h3>Hello {this.state.userName}</h3>
          <br></br>
          <Link to='/stamps'>Stamps</Link>
          <br></br>
          <LogoutButton onClick={this.handleLogoutSubmit} />
        </div>
      )
    } else {
      return (
        <div>
          <Login onClick={this.handleLoginSubmit} />
          <br></br>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )
    }
  }


  render() {
    return (
      <Router>
        <header className="App-header">
          <h1>RECLAIM!</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {this.welcomeDisplay()}
            </Route>
            <Route exact path="/signup" >
              <Signup onClick={this.handleSignupSubmit} />
            </Route>
            <Route exact path="/stamps">
              { this.state.loggedIn ? <App userID={this.state.userID} /> : <Redirect to="/" /> }
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
};

export default Home;
