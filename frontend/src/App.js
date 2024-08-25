import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BacklogPage from './pages/Backlog';
import ProjectPage from './pages/Projects';
import SprintPage from './pages/SprintPage';
import TaskDescriptionPage from './pages/TaskPage';
import ChartsPage from './pages/ChartsPage';
import Profile from './pages/Profile';

const PrivateRoute = () => {
  let auth = localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/sprint/active" element={<SprintPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/task/:id" element={<TaskDescriptionPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
