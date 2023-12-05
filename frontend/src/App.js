import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Course from './components/Course/Course.jsx';
import User from './components/User/User.jsx';
import NotFound from './pages/NotFound/Notfound.jsx';
import Profile from './components/Profile/Profile.jsx';
import Home from './pages/Home/Home.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import CourseForm from './components/CourseForm/CourseForm.jsx';
import CourseInfo from './components/CourseInfo/CourseInfo.jsx';
import CourseEdit from './components/CourseEdit/CourseEdit.jsx';

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<User currUser={currUser} setCurrUser={setCurrUser} />}
        />
        <Route path="/user" element={<User currUser={currUser} setCurrUser={setCurrUser} />} />
        <Route path='/courses' element={<Course />} />
        <Route path='/user' element={<User />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/singup' element={<Signup />} />
        <Route path='/create-course' element={<CourseForm />} />
        <Route path='/courseinfo' element={<CourseInfo />} />
        <Route path='/courseedit' element={<CourseEdit />} />
      </Routes>
    </Router>
  );
};

export default App;