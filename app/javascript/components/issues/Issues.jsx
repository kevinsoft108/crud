/* global window */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import FetchService from '@services/Fetch.service';
import IssueForm from './IssueForm';
import IssueList from './IssueList';

const Issues = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      try {
        FetchService.isofetchAuthed({
          url: `/api/v1/projects/${project.id}/issues`,
        })
          .then((res) => {
            setIsLoading(false);
            setIssues(res);
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
    };

    if (project) fetchData();
  }, [project]);

  const addIssue = newIssue => {
    try {
      FetchService.isofetchAuthed({
        url: `/api/v1/projects/${project.id}/issues`,
        data: { issue: newIssue },
        method: 'post'
      })
        .then((res) => {
          const savedIssue = res;
          const newIssues = [...issues, savedIssue];
          setIssues(newIssues);

          toast.success('Issue Added!');
          return navigate(`/projects/${project.id}/issues/${res.id}/edit`);
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateIssue = updatedIssue => {
    try {
      FetchService.isofetchAuthed({
        url: `/api/v1/projects/${project.id}/issues/${updatedIssue.id}`,
        data: { issue: updatedIssue },
        method: 'patch'
      })
        .then((res) => {
          const newIssues = issues;
          const idx = newIssues.findIndex((issue) => issue.id === updatedIssue.id);
          newIssues[idx] = {...updatedIssue, ...res};
          setIssues(newIssues);
    
          toast.success('Issue Updated!');
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIssue = (issueId, redirect = false) => {
    const sure = window.confirm('Are you sure?');
  
    if (sure) {
      try {
        FetchService.isofetchAuthed({
          url: `/api/v1/projects/${project.id}/issues/${issueId}`,
          method: 'delete'
        })
          .then((res) => {
            const newIssues = [...issues];
            const idx = newIssues.findIndex(issue => issue.id === Number(issueId));
            newIssues.splice(idx, 1);
            setIssues(newIssues);

            toast.success('Issue Deleted!');
            if (redirect) {
              return navigate(`/projects/${project.id}/`);
            }
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!project) return (<Navigate to='/projects' />);

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center'>
          <MDBSpinner className='mx-2' color='secondary'>
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <Routes>
          <Route path='issues/:issueId/edit' element={<IssueForm project={project} issues={issues} onUpdate={updateIssue} onDelete={deleteIssue} />}/>
          <Route path='issues/new' element={<IssueForm project={project} issues={issues} onAdd={addIssue} />} />
          <Route path='*' element={<IssueList project={project} issues={issues} onDelete={deleteIssue} />} />
        </Routes>
      )}
    </>
  );
};

export default Issues;
