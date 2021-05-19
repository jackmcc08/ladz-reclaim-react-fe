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
import Wallet from './wallet/Wallet.js'

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

  handleLoginSubmit(data) {
    this.setState({
      loggedIn: true,
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
      userName: data.username,
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
          <Link to='/wallet'>Wallet</Link>
          <br></br>
          <LogoutButton onClick={this.handleLogoutSubmit} />
        </div>
      )
    } else {
      return (
        <div className="login-div">
          <Login onClick={this.handleLoginSubmit} />
          <br></br>
          <Link className="sign-up-link" to='/signup'>Sign Up</Link>
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
              { this.state.loggedIn ? <App userID={this.state.userID} businessID={1} /> : <Redirect to="/" /> }
              { this.state.loggedIn ? <App userID={this.state.userID} businessID={2} /> : <Redirect to="/" /> }
              <Link to='/'>Home</Link>
            </Route>
            <Route exact path="/wallet">
              { this.state.loggedIn ? <Wallet userID={this.state.userID} username={this.state.userName} /> : <Redirect to="/" /> }
              <Link to='/'>Home</Link>
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
};

export default Home;
