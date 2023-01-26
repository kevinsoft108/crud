import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';
import {
  Field,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FetchService from '../../services/Fetch.service';
import TokenService from '../../services/Token.service';
import { useAuth } from '../../services/Auth.context';

function Login() {
  const [authState, authDispatch] = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className='text-center mb-3'>
        <p>Sign in with:</p>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          FetchService.isofetch(
            '/login',
            { user: values },
            'POST'
          )
            .then((res) => {
              setSubmitting(false);
              if (res.status && res.status.code === 200) {
                // save token in cookie for subsequent requests
                const tokenService = new TokenService();
                tokenService.saveToken(res.authToken);

                authDispatch({
                  type: 'setAuthDetails',
                  payload: {
                    id: res.data.id,
                    email: res.data.email,
                  }
                });
                toast.success(res.status.message);
                return navigate('/projects');
              } else {
                toast.error(res.error);
              }
            })
            .catch();
        }}
      >
        {({ isSubmitting }) => (
          <Form className='form-sign'>
            <div className='inputWrap'>
              <Field id='email' as={MDBInput} name='email' type='email' placeholder='Email' wrapperClass='mb-4' label='Email address' />
              <ErrorMessage name='email'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>
            <div className='inputWrap'>
              <Field as={MDBInput} id='password' name='password' type='password' placeholder='Password' wrapperClass='mb-4' label='Password' />
              <ErrorMessage name='password'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>
            <div className='mb-4'>
              <a title='Forgot password' className='forgot_pass' href='#'>Forgot password</a>
            </div>
            <MDBBtn type='submit' name='submit' disabled={isSubmitting} className='mb-4 w-100'>Sign in</MDBBtn>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;