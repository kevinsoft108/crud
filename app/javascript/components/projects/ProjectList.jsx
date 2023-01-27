import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBTypography,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

const ProjectList = ({ projects, onDelete }) => {

  const renderProjects = (projectArray) =>
    projectArray
      .map((project) => (
        <div key={project.id} className='mb-2'>
          <div className='d-flex justify-content-between'>
            <NavLink to={`/projects/${project.id}`}>
              {project.title}
            </NavLink>
            <div className='action'>
              <MDBDropdown>
                <MDBDropdownToggle color='tertiary' rippleColor='light'>
                  <MDBIcon fas icon='ellipsis-h' />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link childTag='button'>
                    <NavLink to={`/projects/${project.id}/edit`}>
                      Edit
                    </NavLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link childTag='button' onClick={() => onDelete(project.id)}>
                    Delete
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </div>
          </div>
        </div>
      ));

  return (
    <section>
      <MDBTypography tag='h5'>
        Projects
      </MDBTypography>

      <div className='d-flex justify-content-end mb-4'>
        <NavLink to='/projects/new'>
          <MDBBtn>
            <MDBIcon fas icon='plus' /> Create new project
          </MDBBtn>
        </NavLink>
      </div>

      <div>{renderProjects(projects)}</div>
    </section>
  );
};

export default ProjectList;
