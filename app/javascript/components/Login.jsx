import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function App() {

  const [justifyActive, setJustifyActive] = useState('tab1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

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

          <div className="text-center mb-3">
            <p>Sign in with:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' onChange={(e) => {setEmail(e.target.value)}}
          />
          <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' onChange={(e) => {setPassword(e.target.value)}}/>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign up with:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' onChange={(e) => {setEmail(e.target.value)}}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' onChange={(e) => {setPassword(e.target.value)}}/>
          <MDBInput wrapperClass='mb-4' label='Re-enter' id='confirm' type='password' onChange={(e) => {setConfirm(e.target.value)}}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;