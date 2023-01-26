/* global window */

import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import FetchService from '../../services/Fetch.service';
import IssueForm from './IssueForm';
import IssueList from './IssueList';

const Issues = ({ project }) => {
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const toggleShow = (enable) => setVisible(enable);

  useEffect(() => {
    const fetchData = () => {
      try {
        FetchService.isofetchAuthed(
          `/api/v1/projects/${project.id}/issues`,
          null,
          'GET'
        )
          .then((res) => {
            const data = res;
            setIssues(data);
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
  
      setIsLoading(false);
    };
  
    if (project) fetchData();
  }, []);

  const newIssue = () => {
    setIssue({});
    toggleShow(true);
  }

  const saveIssue = sIssue => {
    if (sIssue.id) updateIssue(sIssue);
    else addIssue(sIssue);
  }
  
  const addIssue = newIssue => {
    try {
      FetchService.isofetchAuthed(
        `/api/v1/projects/${project.id}/issues`,
        { issue: newIssue },
        'POST'
      )
        .then((res) => {
          const savedIssue = res;
          const newIssues = [...issues, savedIssue];
          setIssues(newIssues);

          toast.success('Issue Added!');
          toggleShow(true);
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };
  
  const editIssue = issueId => {
    const newIssues = [...issues];
    const idx = newIssues.findIndex(issue => issue.id === Number(issueId));
    let newItem;
    if (idx > -1) newItem = newIssues[idx];
    else newItem = {};
    setIssue(newItem);
    toggleShow(true);
  };

  const updateIssue = updatedIssue => {
    try {
      FetchService.isofetchAuthed(
        `/api/v1/projects/${project.id}/issues/${updatedIssue.id}`,
        { issue: updatedIssue },
        'PATCH'
      )
        .then((res) => {
          const newIssues = issues;
          const idx = newIssues.findIndex((issue) => issue.id === updatedIssue.id);
          newIssues[idx] = {...updatedIssue, ...res};
          setIssues(newIssues);
    
          toast.success('Issue Updated!');
          toggleShow(false);
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIssue = issueId => {
    const sure = window.confirm('Are you sure?');
  
    if (sure) {
      try {
        FetchService.isofetchAuthed(
          `/api/v1/projects/${project.id}/issues/${issueId}`,
          null,
          'DELETE'
        )
          .then((res) => {
            const newIssues = [...issues];
            const idx = newIssues.findIndex(issue => issue.id === Number(issueId));
            newIssues.splice(idx, 1);
            setIssues(newIssues);

            toast.success('Issue Deleted!')
            toggleShow(false);
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <MDBSpinner className='mx-2' color='secondary'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      ) : (
        <>
          <div className='d-flex justify-content-end'>
            <MDBBtn onClick={newIssue} className='mb-4 btn-lg'>
              <i className='fas fa-plus'></i> Create a new Issue
            </MDBBtn>
          </div>
          <IssueList issues={issues} onEdit={editIssue} onDelete={deleteIssue} />
          
          <MDBModal show={visible} setShow={setVisible} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>{issue.id ? issue.title : 'New issue'}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => toggleShow(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <IssueForm eIssue={issue} onSave={saveIssue} onCancel={() => toggleShow(false)} />
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      )}
    </>
  );
};

export default Issues;
