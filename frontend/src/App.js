import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BacklogPage from './pages/Backlog';
import CurrentSprint from './pages/CurrentSprint';
import ProjectPage from './pages/Projects';
import SprintPage from './pages/SprintPage';

const PrivateRoute = () => {
  let auth = localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/sprints" element={<SprintPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/currentsprint" element={<CurrentSprint />} />
        <Route element={<PrivateRoute />}>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
