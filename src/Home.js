import React, { useContext, createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';
import Login from './logInOut/Login.js';
import Signup, { SignUpButton } from './logInOut/Signup.js';
import {LogoutButton} from './logInOut/Logout.js'
import App from './App';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userID: null
    };
  }

  handleLoginSubmit() {
    this.setState({
      loggedIn: true,
      userID: 8,
    });
    console.log("This has been clicked.")
  }

  handleLogoutSubmit() {
    this.setState({
      loggedIn: false,
      userID: null,
    })
  }

  handleSignupSubmit() {
    this.setState({
      loggedIn: false,
      userID: null,
    })
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
              <Login onClick={() => this.handleLoginSubmit()} />
              <br></br>
              <Link to='/signup'>Sign Up</Link>
              <br></br>
              <Link to='/stamps'>Stamps</Link>
              <br></br>
              <LogoutButton onClick={() => this.handleLogoutSubmit()} />
            </Route>
            <Route exact path="/signup">
              <Signup onClick={() => this.handleSignupSubmit()} />
            </Route>
            <Route exact path="/stamps">
              <App />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
};

export default Home;
