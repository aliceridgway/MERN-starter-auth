/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/auth';
import {
  SignUpBox as SignInBox, SignUpForm as SignInForm, Submit, Subtext,
} from './Register';


const SignIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.API_URL}/login`, user)
      .then((response) => {
        if (response.status === 200) {
          setAuthTokens(response.data.accessToken);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      }).catch(() => {
        setIsError(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }


  return (

    <SignInBox>
      <h2>Sign In</h2>
      {isError && <p>Incorrect username/password</p>}
      <SignInForm onSubmit={submitForm} method="POST">

        <label htmlFor="email">
          Email
          <input
            name="email"
            id="email"
            type="email"
            aria-label="Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            id="password"
            aria-label="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </label>

        <Submit type="submit">Sign In</Submit>

      </SignInForm>
      <Subtext>
        Don&#39;t have an account?
        {' '}
        <Link to="/register">Sign up!</Link>
      </Subtext>
    </SignInBox>
  );
};

export default SignIn;
