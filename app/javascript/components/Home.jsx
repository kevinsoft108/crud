import React from 'react';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';

import storage from '../services/utils/storage';
import checkLogin from '../services/utils/checkLogin';
import { useAuth } from '../services/Auth.context';
import Auth from './auth/Auth';

function Home() {
  const [authState, authDispatch] = useAuth();
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column'>
      {
        isLoggedIn ?
        <div className='text-center mt-6'>
          <div className='text-center mb-4'>
            You have already signed in. Not found what you want?
          </div>
          <NavLink to={'/projects'}>
            <MDBBtn className='me-1'>Go to projects</MDBBtn>
          </NavLink>
        </div>
        :
        <MDBRow className='justify-content-center'>
          <MDBCol sm='10' md='8' lg='6' xl='4'>
            <Auth />
          </MDBCol>
        </MDBRow>
      }
    </MDBContainer>
  );
}

export default Home;