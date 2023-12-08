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
import CreateCourse from './components/CreateCourse/CreateCourse.jsx';
import CourseInfo from './components/CourseInfo/CourseInfo.jsx';
import CourseEdit from './components/CourseEdit/CourseEdit.jsx';
import EditProfile from './components/EditProfile/EditProfile.jsx';
import CourseDelete from './components/CourseDelete/CourseDelete.jsx';
// import AddEntityForm from './components/AddEntityForm/AddEntityForm.jsx';
import CreateLocation from './components/CreateAddress/CreateAddress.jsx';
import CreateBranch from './components/CreateBranch/CreateBranch.jsx';
import InstitutionForm from './components/InstitutionForm/InstitutionForm.jsx';
import CreateCategory from './components/CreateCategory/CreateCategory.jsx';


const App = () => {
  const [currUser, setCurrUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User currUser={currUser} setCurrUser={setCurrUser} />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/course/:selectedId" element={<CourseInfo />} />
        <Route path="/edit-course/:selectedId" element={<CourseEdit />} />
        <Route path='/delete-course/:selectedId' element={<CourseDelete />} />
        <Route path="/edit-profile/:selectedId" element={<EditProfile />} />
        {/* <Route path="/complete-form" element={<AddEntityForm />} /> */}
        <Route path='/addresses' element={<CreateLocation />} />
        <Route path='/branches' element={<CreateBranch />} />
        <Route path='/institution-form' element={<InstitutionForm />} />
        <Route path='/create-categories' element={<CreateCategory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
