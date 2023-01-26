// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they show login page.

import React from 'react';
import useSWR from 'swr';
import storage from '../../services/utils/storage';
import checkLogin from '../../services/utils/checkLogin';
import Home from '../Home'

const RequireAuth = ({ children }) => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  if (!isLoggedIn) {
    return <Home />;
  }
  return children;
}

export default RequireAuth