// # frontend / src / components / User.js
import Signup from "../Signup/signup.jsx"
import Login from "../Login/login.jsx"
import Logout from "../Logout/logout.jsx";
import PrivateText from "../PrivateText/privatetext.jsx"
import { useState } from "react";

const User = ({ currUser, setCurrUser }) => {
  const [show, setShow] = useState(true)
  if (currUser)
    return (
      <div>
        WELCOME TO ZENEDHUB
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
