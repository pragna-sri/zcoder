import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import PublicProblems from './components/PublicProblems.jsx';
import Navbar from './Navbar.jsx';
import Problems from './components/Problems.jsx';
import Calendar from './components/Calendar.jsx';
import Profile from './components/Profile.jsx';

import './App.css';

function App() {
  const [publicProblems, setPublicProblems] = useState([]);

  const addToPublicProblems = (problem) => {
    setPublicProblems([...publicProblems, problem]);
  };

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/problems" element={<Problems addToPublicProblems={addToPublicProblems} />} />
        <Route path="/public-problems" element={<PublicProblems publicProblems={publicProblems} />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
