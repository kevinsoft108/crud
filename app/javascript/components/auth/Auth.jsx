import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
}
from 'mdb-react-ui-kit';

import Login from './Login';
import Register from './Register';

function Auth() {

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value !== justifyActive) {
      setJustifyActive(value);
    }
  };

  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column'>
      <MDBRow className='justify-content-center'>
        <MDBCol sm='10' md='8' lg='6' xl='4'>
          <MDBContainer className='p-3 my-5 d-flex flex-column'>
            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                  Login
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                  Register
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

              <MDBTabsPane show={justifyActive === 'tab1'}>

                <Login />

              </MDBTabsPane>

              <MDBTabsPane show={justifyActive === 'tab2'}>

                <Register onSuccess={() => setJustifyActive('tab1')} />

              </MDBTabsPane>

            </MDBTabsContent>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Auth;