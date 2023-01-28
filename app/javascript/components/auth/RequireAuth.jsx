// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they redirect login page.
// Do not use SWR here.

import React from 'react';
import { Navigate } from 'react-router-dom';
import checkLogin from '../../services/utils/checkLogin';

const RequireAuth = ({ children }) => {
  const value = localStorage.getItem('user');
  const currentUser = !!value ? JSON.parse(value) : undefined;
  const isLoggedIn = checkLogin(currentUser);

  return !isLoggedIn ? <Navigate to='/' /> : children;
}

export default RequireAuth