import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBTypography,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody
}
from 'mdb-react-ui-kit';

const IssueList = ({ project, issues, onEdit, onDelete }) => {

  return (
    <div className='issue-container'>
      <MDBTypography tag='h5'>
        {project.title}
      </MDBTypography>
      <div className='d-flex justify-content-end mb-4'>
        <NavLink to={'/projects'}>
          <MDBBtn className='me-1' color='secondary'>
            <MDBIcon fas icon='undo' /> Back
          </MDBBtn>
        </NavLink>
        <NavLink to={`/projects/${project.id}/issues/new`}>
          <MDBBtn className='me-1'>
            <MDBIcon fas icon='plus' /> Create new issue
          </MDBBtn>
        </NavLink>
      </div>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Date created</th>
            <th>Assigned to</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {issues.map((issue, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{issue.title}</td>
                <td>{new Date(issue.created_at).toISOString().slice(0, 10)}</td>
                <td>{issue.assignee}</td>
                <td>{issue.status}</td>
                <td className='action'>
                  <MDBDropdown>
                    <MDBDropdownToggle color='tertiary' rippleColor='light'>
                      <MDBIcon fas icon='ellipsis-h' />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link childTag='button'>
                        <NavLink to={`/projects/${project.id}/issues/${issue.id}/edit`}>
                          Edit
                        </NavLink>
                      </MDBDropdownItem>
                      <MDBDropdownItem link childTag='button' onClick={() => onDelete(issue.id)}>
                        Delete
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </td>
              </tr>
            )
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default IssueList;
