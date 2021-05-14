import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Login, { LoginButton, SignUpButton } from './Login.js';
import App from './App';

const Home = () => {
    return (
    <Router>
      <div>
          <Link to='/signup'>Sign Up</Link>
          <br></br>
          <Link to='/stamps'>Stamps</Link>
      </div>

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Login />
        </Route>
        <Route exact path="/stamps">
          <App />
        </Route>
      </Switch>
    </Router>
    );
};

export default Home;
