import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  MDBTypography,
  MDBBtn,
  MDBInput,
  MDBTextArea,
}
from 'mdb-react-ui-kit';
import {
  Field,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import Comments from '../comments/Comments'

const IssueForm = ({ project, issues, onAdd, onUpdate, onDelete }) => {
  const { issueId } = useParams();
  let issue = issues.find((i) => i.id === Number(issueId));
  if (!issue) issue = {};

  return (
    <>
      <MDBTypography tag='h5'>
        Issue{issue.id} - {issue.title || 'New'}
      </MDBTypography>
      <Formik
        initialValues={{
          title: issue.title || '',
          description: issue.description || '',
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
          setSubmitting(false);
          if (issue.id) { values.id = issue.id; onUpdate(values); }
          else onAdd(values);
        }}
      >
        {(formik) => (
          <Form>
            <div className='d-flex flex-row-reverse mb-4'>
              {issue.id ? (
                <MDBBtn onClick={(e) => {e.preventDefault();onDelete(issue.id, true)}}>
                  Delete
                </MDBBtn>
                ) : (
                  <></>
                )
              }
              <MDBBtn type='submit' name='submit' disabled={formik.isSubmitting} className='me-1'>Save</MDBBtn>
              <NavLink to={`/projects/${project.id}`}>
                <MDBBtn color='secondary' className='me-1'>Cancel</MDBBtn>
              </NavLink>
            </div>

            <div className='d-flex justify-content-between mb-4'>
              <div>
                <strong>Issue Number:</strong> {issue.id || null}
              </div>
              <div>
                <strong>Creation Date:</strong> {(issue.created_at ? new Date(issue.created_at) : new Date()).toISOString().slice(0, 10)}
              </div>
            </div>

            <div className='inputWrap'>
              <Field id='title' as={MDBInput} name='title' placeholder='Title' wrapperClass='mb-4' label='Title' />
              <ErrorMessage name='title'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='inputWrap'>
              <Field id='description' as={MDBTextArea} name='description' rows={3} placeholder='Description' wrapperClass='mb-4' label='Description' />
              <ErrorMessage name='description'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='inputWrap'>
              <Field as={MDBInput} id='assignee' name='assignee' placeholder='Assigned to' wrapperClass='mb-4' label='Assigned to' />
              <ErrorMessage name='assignee'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>

            <div className='inputWrap'>
              <div className='form-outline mb-4'>
                <Field as='select' name='status' className='form-control select-input active'>
                  <option value='Active'>Active</option>
                  <option value='On Hold'>On Hold</option>
                  <option value='Resolved'>Resolved</option>
                  <option value='Closed'>Closed</option>
                </Field>
                <label className='form-label' htmlFor='status'>Status</label>
                <div className='form-notch'>
                  <div className='form-notch-leading'></div>
                  <div className='form-notch-middle' style={{ width: 50 }}></div>
                  <div className='form-notch-trailing'></div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Comments issue={issue} />
    </>
  );
};

export default IssueForm;
