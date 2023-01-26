import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBInput,
  MDBRadio,
}
from 'mdb-react-ui-kit';
import {
  Field,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';

const RadioButton = ({
  name,
  value,
  id,
  label,
  className,
  formik,
  ...props
}) => (
  <Field
    as={MDBRadio}
    name={name}
    id={id}
    label={label}
    value={value}
    inline
    checked={formik.getFieldProps('status').value === value}
    onChange={formik.handleChange} />
)

const IssueForm = ({ eIssue, onSave, onCancel }) => {
  const [issue, setIssue] = useState({});

  useEffect(() => {
    const getIssue = () => {
      setIssue(eIssue);
    };
  
    getIssue();
  }, [eIssue]);

  return (
    <div>
      <Formik
        initialValues={{
          title: issue.title || '',
          assignee: issue.assignee || '',
          status: issue.status || 'Active'
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Required'),
          assignee: Yup.string()
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (issue.id) values.id = issue.id;
          onSave(values);
        }}
      >
        {(formik) => (
          <Form className='form-sign'>
            <div className='inputWrap'>
              <Field id='title' as={MDBInput} name='title' placeholder='Title' wrapperClass='mb-4' label='Title' />
              <ErrorMessage name='title'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='inputWrap'>
              <Field as={MDBInput} id='assignee' name='assignee' placeholder='Assigned to' wrapperClass='mb-4' label='Assigned to' />
              <ErrorMessage name='assignee'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='inputWrap'>
              <RadioButton name='status' id='status-active' label='Active' value='Active' formik={formik} />
              <RadioButton name='status' id='status-on-hold' label='On Hold' value='On Hold' formik={formik} />
              <RadioButton name='status' id='status-resolved' label='Resolved' value='Resolved' formik={formik} />
            </div>

            <div className='d-flex flex-row-reverse mb-4'>
              <MDBBtn type='submit' name='submit' disabled={formik.isSubmitting}>Submit</MDBBtn>
              <MDBBtn className='btn-secondary' onClick={(e) => {e.preventDefault(); onCancel();}}>Cancel</MDBBtn>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IssueForm;
