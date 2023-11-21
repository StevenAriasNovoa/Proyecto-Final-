import Login from '../../pages/Login/login.jsx'
import Signup from '../../pages/Signup/signup.jsx';
import Logout from '../../pages/Logout/logout.jsx'
import PrivateText from '../../pages/PrivateText/privatetext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Navbar from '../Navbar/navbar.jsx';

const User = ({ currUser, setCurrUser }) => {
  const [show, setShow] = useState(true)

  if (currUser)

    return (
      <header>
        <Navbar></Navbar> 
        <br />
      <div>
        Welcome to Courses Finder {currUser.name}
        <PrivateText currUser={currUser} />
        <Logout setCurrUser={setCurrUser} />
      </div>
      </header>
    )
  return (
    <div>
      {show ?
        <Login setCurrUser={setCurrUser} setShow={setShow} />
        :
        <Signup setCurrUser={setCurrUser} setShow={setShow} />
      }
    </div>
  )
}

export default User;
