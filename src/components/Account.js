import React from 'react';
import { useAuth } from '../context/auth';

function Account() {
  const { setAuthTokens } = useAuth();

  function logOut() {
    // localStorage.setItem('tokens', null);
    setAuthTokens(null);
  }

  return (
    <div>
      <div>Admin Page</div>
      <button type="button" onClick={logOut}>Log out</button>
    </div>
  );
}

export default Account;
