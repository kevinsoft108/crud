import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBSpinner
}
from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import FetchService from '../../services/Fetch.service';
import Project from './Project';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      try {
        FetchService.isofetch(
          '/api/v1/projects',
          null,
          'GET'
        )
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
      FetchService.isofetch(
        '/api/v1/projects',
        { project: newProject },
        'POST'
      )
        .then((res) => {
          const savedProject = res;
          const newProjects = [...projects, savedProject];
          setProjects(newProjects);

          toast.success('Project Added!');
          navigate(`/projects/${savedProject.id}`);
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
        FetchService.isofetch(
          `/api/v1/projects/${projectId}`,
          null,
          'DELETE'
        )
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
      FetchService.isofetch(
        `/api/v1/projects/${updateProject.id}`,
        { project: updateProject },
        'PATCH'
      )
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
    <>
      {isLoading ? (
        <MDBSpinner className='mx-2' color='secondary'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      ) : (
        <MDBContainer>
          <Routes>
            <Route
              path=':id/edit'
              element={<ProjectForm projects={projects} onSave={updateProject} />}
            />
            <Route
              path=':id/*'
              element={<Project projects={projects} />}
            />
            <Route path='new' element={<ProjectForm onSave={addProject} />} />
            <Route path='' element={<ProjectList projects={projects} onDelete={deleteProject} />} />
          </Routes>
        </MDBContainer>
      )}
    </>
  );
};

export default Projects;
