import React from "react";
// import logotext from './logotext.png';
import "./Footer.css";

function Footer() {
  return (
    <>
    <footer className="footer">
      {/* <img className="logotext" src={logotext} alt="logo" /> */}
      <div className="copytext">
        <p>&copy; 2023 CourseFinder| Todos los derechos reservados</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
