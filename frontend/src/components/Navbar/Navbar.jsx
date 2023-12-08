import React from 'react';
import { useState } from 'react';
import Logoimg from '../Navbar/logotext.png';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [searchCourse, setSearchCourse] = useState('');

  const handleSearchChange = (event) => {
    setSearchCourse(event.target.value);
  };

  const search = () => {
    if (searchCourse.trim() === '') {  // Si la búsqueda está vacía, cargar todos los cursos
      
      onSearch(''); // Llama con una cadena vacía para cargar todos los cursos
    } else {
      onSearch(searchCourse.trim()); // Llama a onSearch con el término de búsqueda
    }
  };

  const detectenter = (e) => {
    e.key === 'Enter' && search()
  };

  return (
    <>
      <div className="navbar">
        <img className='logoside' src={Logoimg} alt="logo" />
        <div className="search">
          <input
            onChange={handleSearchChange}
            className='textseeker'
            type="text"
            placeholder="categoria del curso, o nombre"
            onKeyDown={detectenter}
          />
          <button
            onClick={search}
            className='seeker'
          >Buscar</button>
        </div>
        <div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
