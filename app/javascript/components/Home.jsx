import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import storage from '../services/utils/storage';
import checkLogin from '../services/utils/checkLogin';
import TokenService from '../services/Token.service';
import { useAuth } from '../services/Auth.context';
import Auth from './auth/Auth';

function Home() {
  const [authState, authDispatch] = useAuth();
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const navigate = useNavigate();

  const logout = () => {
    const tokenService = new TokenService();
    authDispatch({
      type: 'removeAuthDetails'
    });

    tokenService.deleteToken();
    toast.success('Logout successfully.');
  }

  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column'>
      {
        isLoggedIn ?
        <div className='text-center mt-6'>
          <div className='text-center mb-4'>
            You have already signed in. Not found what you want?
          </div>
          <Link to={'/projects'}>
            <MDBBtn className='me-1'>Go to projects</MDBBtn>
          </Link>
          <Link onClick={logout}>
            <MDBBtn className='me-1'>Logout</MDBBtn>
          </Link>
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