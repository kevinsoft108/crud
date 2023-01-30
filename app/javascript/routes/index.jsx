import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';

import RequireAuth from '../components/auth/RequireAuth'
import Projects from '../components/projects/Projects'
import Home from '../components/Home'

const Routing = () => (
  <Routes>
    <Route path='projects/*' element={<RequireAuth><Projects /></RequireAuth>} />
    <Route path='*' element={<Home />} />
  </Routes>
);

export default Routing