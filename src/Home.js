import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Login from './logInOut/Login.js';
import Signup from './logInOut/Signup.js';
import {LogoutButton} from './logInOut/Logout.js'
import App from './App';
// import { createBrowserHistory } from 'history';
// let history = createBrowserHistory();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userID: null,
      userName: null,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
  }

  handleLoginSubmit() {
    this.setState({
      loggedIn: true,
      userID: 8,
      userName: "Ladz",
    });
    // console.log("This has been clicked.")
  }

  handleLogoutSubmit() {
    this.setState({
      loggedIn: false,
      userID: null,
      userName: null,
    })
  }

  handleSignupSubmit() {
    this.setState({
      loggedIn: true,
      userID: 8,
      userName: "Ladz",
    });

  }
  //

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
              { this.state.loggedIn ? <App /> : <Redirect to="/" /> }
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
};

export default Home;
