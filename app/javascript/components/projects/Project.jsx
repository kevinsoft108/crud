import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MDBTypography,
}
from 'mdb-react-ui-kit';

import Issues from '../issues/Issues';

const Project = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find((e) => e.id === Number(id));

  if (!project) return <>Not found</>;

  return (
    <div className='project-container'>
      <MDBTypography>
        {project.title}
      </MDBTypography>

      <Issues project={project} />
    </div>
  );
};

export default Project;
