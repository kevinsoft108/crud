import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import RequireAuth from '../components/auth/RequireAuth'
import Projects from '../components/projects/Projects'
import Home from '../components/Home'

const Routing = () => (
  <Router>
    <Routes>
      <Route path='projects*' element={<RequireAuth><Projects /></RequireAuth>} />
      <Route path='' element={<Home />} />
    </Routes>
  </Router>
);

export default Routing