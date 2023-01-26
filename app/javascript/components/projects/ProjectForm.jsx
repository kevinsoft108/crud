import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MDBBtn,
  MDBInput,
  MDBTypography,
}
from 'mdb-react-ui-kit';
import {
  Field,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';

const ProjectForm = ({ projects, onSave }) => {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = () => {
      const idx = projects.findIndex(project => project.id === Number(id));
      if (idx > -1) setProject(projects[idx]);
      else setProject({});
    }
    getProject();
  }, []);

  const title = project.id ? `${project.title}` : 'New Project';

  if (id && !project.id) return <>Not Found</>;

  return (
    <div>
      <MDBTypography>{title}</MDBTypography>

      <Formik
        initialValues={{
          title: project.title || ''
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (project.id) values.id = project.id;
          onSave(values)
            .then((res) => {
              console.log(res)
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className='form-sign'>
            <div className='inputWrap'>
              <Field id='title' as={MDBInput} name='title' placeholder='Title' wrapperClass='mb-4' label='Title' />
              <ErrorMessage name='title'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
            </div>
            <div className="d-flex flex-row-reverse mb-4">
              <MDBBtn type='submit' name='submit' disabled={isSubmitting}>Submit</MDBBtn>
              <Link to='/projects'>
                <MDBBtn className='btn-secondary'>Cancel</MDBBtn>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;

ProjectForm.defaultProps = {
  projects: [],
};
