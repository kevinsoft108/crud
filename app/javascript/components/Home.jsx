import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBContainer,
  MDBBtn,
}
from 'mdb-react-ui-kit';

import checkLogin from '../services/utils/checkLogin';
import Auth from './auth/Auth';
import { useAuth } from '../services/Auth.context';

function Home() {
  const [currentUser, authDispatch] = useAuth();
  const isLoggedIn = checkLogin(currentUser);

  if (!isLoggedIn) return <Auth />

  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column'>
      <div className='text-center mt-6'>
        <div className='text-center mb-4'>
          You have already signed in. Not found what you want?
        </div>
        <NavLink to={'/projects'}>
          <MDBBtn className='me-1'>Go to projects</MDBBtn>
        </NavLink>
      </div>
    </MDBContainer>
  );
}

export default Home;