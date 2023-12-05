import React from 'react';
import Logout from '../Logout/Logout';

import './Navbar.css';


const CustomNavbar = () => {

  return (
    <>
      <div className="navbar">
        <div className="logo">logo proximamente xd</div>
        <div className="search">
          <input type="text" placeholder="Buscar" />
          <button className='btn'>Buscar</button>
        </div>
        <div className="logout">
        <Logout />
        </div>
      </div>
    </>
  );
};

export default CustomNavbar;