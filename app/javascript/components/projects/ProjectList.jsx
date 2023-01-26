import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  MDBBtn,
  MDBTypography,
}
from 'mdb-react-ui-kit';

const ProjectList = ({ projects, onDelete }) => {

  const renderProjects = (projectArray) =>
    projectArray
      .map((project) => (
        <li key={project.id}>
          <div className='d-flex justify-content-between'>
            <NavLink to={`/projects/${project.id}`}>
              {project.title}
            </NavLink>
            <div>
              <Link to={`/projects/${project.id}/edit`}>
                <MDBBtn className='mb-4 btn-secondary'>
                  <i className='fas fa-edit'></i> Edit
                </MDBBtn>
              </Link>
              <MDBBtn className='mb-4 btn-danger' onClick={() => onDelete(project.id)}>
                <i className='fas fa-trash'></i> Delete
              </MDBBtn>
            </div>
          </div>
        </li>
      ));

  return (
    <section>
      <MDBTypography>
        Projects
      </MDBTypography>

      <div className='d-flex justify-content-end'>
        <Link to='/projects/new'>
          <MDBBtn className='mb-4 btn-lg'>
            <i className='fas fa-plus'></i> Create new project
          </MDBBtn>
        </Link>
      </div>

      <ul>{renderProjects(projects)}</ul>
    </section>
  );
};

export default ProjectList;
