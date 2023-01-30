import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBSpinner
}
from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import FetchService from '../../services/Fetch.service';
import Issues from '../issues/Issues';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      try {
        FetchService.isofetchAuthed({
          url: '/api/v1/projects'
        })
          .then((res) => {
            const data = res;
            setProjects(data);
          })
          .catch();
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addProject = (newProject) => {
    try {
      FetchService.isofetchAuthed({
        url: '/api/v1/projects',
        data: { project: newProject },
        method: 'post'
      })
        .then((res) => {
          const newProjects = [res, ...projects];
          setProjects(newProjects);

          toast.success('Project Added!');
          navigate(`/projects/${res.id}`);
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = (projectId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        FetchService.isofetchAuthed({
          url: `/api/v1/projects/${projectId}`,
          method: 'delete'
        })
          .then((res) => {
            const newProjects = [...projects];
            const idx = newProjects.findIndex(project => project.id === Number(projectId));
            newProjects.splice(idx, 1);
            setProjects(newProjects);

            toast.success('Project deleted!');
            navigate('/projects');
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateProject = (updatedProject) => {
    try {
      FetchService.isofetchAuthed({
        url: `/api/v1/projects/${updatedProject.id}`,
        data: { project: updatedProject },
        method: 'patch'
      })
        .then((res) => {
          const newProjects = projects;
          const idx = newProjects.findIndex((project) => project.id === updatedProject.id);
          newProjects[idx] = updatedProject;
          setProjects(newProjects);
    
          toast.success('Project Updated!');
          navigate(`/projects/${updatedProject.id}`);
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='py-3'>
      {isLoading ? (
        <div className='d-flex justify-content-center'>
          <MDBSpinner className='mx-2' color='secondary'>
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <MDBContainer>
          <Routes>
            <Route path=':id/edit' element={<ProjectForm projects={projects} onSave={updateProject} />}/>
            <Route path=':id/*' element={<Issues projects={projects} />}/>
            <Route path='new' element={<ProjectForm onSave={addProject} />} />
            <Route path='*' element={<ProjectList projects={projects} onDelete={deleteProject} />} />
          </Routes>
        </MDBContainer>
      )}
    </div>
  );
};

export default Projects;
