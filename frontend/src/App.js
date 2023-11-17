// #frontend / src / App.js
import { useState } from 'react';
import './App.css';
import User from './components/User/user.jsx';
// import PrivateText from './components/PrivateText/privatetext.jsx';
const App = () => {
  const [currUser, setCurrUser] = useState(null);

  return (
    <div className="App">
      <User currUser={currUser} setCurrUser={setCurrUser} />
    </div>
  );
}
export default App;