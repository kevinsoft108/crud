// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they redirect login page.
// Do not use SWR here.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../services/Auth.context';
import checkLogin from '../../services/utils/checkLogin';

const RequireAuth = ({ children }) => {
  const [currentUser, authDispatch] = useAuth();
  const isLoggedIn = checkLogin(currentUser);

  if (!isLoggedIn) {
    toast.warning('You need to login!');
    return (<Navigate to='/' />);
  }

  return children;
}

export default RequireAuth