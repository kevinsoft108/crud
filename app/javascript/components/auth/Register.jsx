import React from 'react';
import {
  MDBBtn,
  MDBInput,
  MDBCheckbox
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

function Register({ onSuccess }) {

  return (
    <>
      <div className='text-center mb-3'>
        <p>Sign up with:</p>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: '',
          password_confirmation: '',
          agree: false
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(1, 'Too short')
            .required('Required'),
          password_confirmation: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
          agree: Yup.boolean()
            .oneOf([true], 'Agreement required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          delete values.agree;
          FetchService.isofetch(
            'signup',
            { user: values },
            'POST'
          )
            .then(res => {
              setSubmitting(false);
              if (res.status && res.status.code === 200) {
                toast.success(res.status.message);
                onSuccess();
              } else {
                toast.error(res.status.message);
              }
            })
            .catch();
        }}
      >
        {({ isSubmitting }) => (
          <Form className='form-sign'>
            <div className='field-input'>
              <Field as={MDBInput} id='email' name='email' placeholder='Email' type='email' wrapperClass='mb-4' label='Email' />
              <ErrorMessage name='email'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='field-input'>
              <Field as={MDBInput} id='password' name='password' placeholder='Password' type='password' wrapperClass='mb-4' label='Password' />
              <ErrorMessage name='password'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='field-input'>
              <Field as={MDBInput} id='password_confirmation' name='password_confirmation' placeholder='Re-enter' type='password' wrapperClass='mb-4' label='Re-enter' />
              <ErrorMessage name='password_confirmation'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='field-input'>
              <Field as={MDBCheckbox} id='agree' name='agree' wrapperClass='mb-4' label='I have read and agree to the terms' />
              <ErrorMessage name='agree'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <MDBBtn type='submit' name='submit' disabled={isSubmitting} className='mb-4 w-100'>Sign Up</MDBBtn>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Register;