import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';

import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import Account from './components/Account';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/account" component={Account} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
