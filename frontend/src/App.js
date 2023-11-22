import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Course from './pages/Course/course.jsx';
import User from './components/User/user.jsx';
import NotFound from './pages/NotFound/notfound.jsx';

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
        <Route path='/course' Component={Course} />
        <Route path='/user' Component={User}/>
        <Route path='/*' Component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
