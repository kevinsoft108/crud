import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
}
from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import checkLogin from '@services/utils/checkLogin';
import TokenService from '@services/Token.service';
import { useAuth } from '@services/Auth.context';

function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const [currentUser, authDispatch] = useAuth();
  const isLoggedIn = checkLogin(currentUser);
  const navigate = useNavigate();

  const logout = () => {
    const tokenService = new TokenService();
    authDispatch({
      type: 'removeAuthDetails'
    });

    tokenService.deleteToken();
    toast.success('Logout successfully.');
    navigate('/');
  }

  if (!isLoggedIn) return <></>

  return (
    <header>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid className='px-4'>
          <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav fullWidth={false} className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => navigate('/')}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => navigate('/projects')}>Projects</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <div className='navbar-text'>{currentUser.full_name || currentUser.email}</div>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={logout} title='Logout'>
                  <MDBIcon fas icon='sign-out-alt' />
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default Header;