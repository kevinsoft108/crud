import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody
}
from 'mdb-react-ui-kit';

const IssueList = ({ issues, onEdit, onDelete }) => {

  return (
    <div className='issue-container'>
      <MDBTable>
        <MDBTableHead>
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
                <td>
                  <MDBBtn className='me-1' color='info' onClick={() => onEdit(issue.id)}>
                    <i className='fas fa-edit'></i> Edit
                  </MDBBtn>
                  <MDBBtn className='me-1' color='warning' onClick={() => onDelete(issue.id)}>
                    <i className='fas fa-trash'></i> Delete
                  </MDBBtn>
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
