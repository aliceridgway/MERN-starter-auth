/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import validate from '../helpers/validateRegister';
import { useAuth } from '../context/auth';


const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { setAuthTokens } = useAuth();
  const [inputError, setInputError] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    const validationErrors = validate(user);
    setInputError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${process.env.API_URL}/register`, user)
        .then((response) => {
          if (response.status === 200) {
            setAuthTokens(response.data.accessToken);
            setLoggedIn(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setInputError({ email: 'An account already exists for this email address' });
          } else {
            console.log(error);
          }
        });
    }
  };

  // if (isLoggedIn) {
  //   return <Redirect to="/" />;
  // }


  return (

    <SignUpBox>
      <h2>Create Your Account</h2>
      <p>Sign up to unlock all app features</p>

      <SignUpForm method="POST" onSubmit={submitForm}>

        <Name>
          <input
            name="firstName"
            id="firstName"
            type="text"
            aria-label="First Name"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="First Name"
            className={inputError.firstName ? 'error' : ''}
          />
          <input
            name="lastName"
            id="lastName"
            type="text"
            aria-label="Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            placeholder="Last Name"
            className={inputError.lastName ? 'error' : ''}
          />
          {inputError.name && <ErrorMsg>{inputError.name}</ErrorMsg>}
        </Name>

        <Email>
          <input
            name="email"
            id="email"
            type="email"
            aria-label="Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email Address"
            className={inputError.email ? 'error' : ''}
          />
          {inputError.email && <ErrorMsg>{inputError.email}</ErrorMsg>}
          {/* {inputError.email.exists
          && <ErrorMsg>An account already exists for this email address</ErrorMsg>} */}

        </Email>

        <Passwords>
          <input
            name="password"
            type="password"
            id="password"
            aria-label="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className={inputError.password ? 'error' : ''}
          />
          <input
            name="confirm-password"
            type="password"
            id="confirm-password"
            aria-label="Confirm Password"
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            placeholder="Confirm Password"
            className={inputError.password ? 'error' : ''}
          />
          {inputError.password && <ErrorMsg>{inputError.password}</ErrorMsg>}
        </Passwords>


        <Submit type="submit">Sign Up</Submit>
        <Subtext>
          Already have an account?
          {' '}
          <Link to="/signin">Sign In</Link>
        </Subtext>
      </SignUpForm>
    </SignUpBox>
  );
};

export default Register;

export const SignUpBox = styled.div`
    width:100%;
    max-width:500px;
    background:#FAFAFA;
    border-radius:5px;
    box-shadow: 3px 3px 5px 5px rgba(0,0,0,0.1);
    padding:2rem;
    margin:2rem;

    h2{
        text-align:center;
        font-weight:300;
        font-size:2rem;
    }

    p{
        text-align:center;
        font-weight:200;
    }
`;

export const SignUpForm = styled.form`
    width:fit-content;
    display:block;
    margin:2.5rem auto;
`;

const Name = styled.div`
    width:100%;
    display:flex;
    position:relative;
    flex-wrap:wrap;
    justify-content:space-between; 
    
    input{
        width:100px;
        flex-grow:1;
    }
`;

const Email = styled.div`
    display:flex;
    position:relative;
    width:100%;
    max-width:400px;
`;

const Passwords = styled(Name)`

`;

export const Submit = styled.button`
    width:150px;
    height:42px;
    display:block;
    margin:0.5rem auto;
    background:dodgerblue;
    border:none;
    border-radius:5px;
    color:rgba(255,255,255,0.9);

`;

export const Subtext = styled.p`
    font-size:0.8rem;
`;

export const ErrorMsg = styled.p`
  position:absolute;
  top:-25px;
  left:10px;
  font-size:0.8rem;
  color:red;
`;
