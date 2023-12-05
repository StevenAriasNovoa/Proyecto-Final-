import Signup from "../Signup/Signup.jsx";
import Login from "../Login/Login.jsx";
import Logout from "../Logout/Logout.jsx";
import PrivateText from "../PrivateText/Privatetext.jsx"
import { useState } from "react";

const User = ({ currUser, setCurrUser }) => {
  const [show, setShow] = useState(true)
  if (currUser)
    return (
      <div>
        welcome CourseFinder
        <br />
        {currUser.name}
        
        <PrivateText currUser={currUser} />
        <Logout setCurrUser={setCurrUser} />
      </div>
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
