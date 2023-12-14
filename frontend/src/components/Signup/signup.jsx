import React, { useRef, useState } from "react";
import Footer from "../Footer/Footer.jsx";
import Logotext from "../Logotext/Logotext.jsx";
import PrivateText from "../PrivateText/Privatetext.jsx";
import "./Signup.css";

const Signup = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const [error, setError] = useState(null);

  const signup = async (userInfo) => {
    const url = "http://localhost:3001/signup";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      localStorage.setItem("token", response.headers.get("Authorization"));

      // Actualizar el estado del usuario utilizando las funciones setCurrUser
      setCurrUser({
        name: data.name,
        email: data.email,
        // Agrega otras propiedades según la estructura de tu usuario
      });

    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar mensajes de error
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
        name: data.name,
        birthdate: data.birthdate,
      },
    };

    await signup(userInfo);

    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <>
      <div className="background1">
        <div className="form-container">
          <form className="signup" ref={formRef} onSubmit={handleSubmit}>
            <Logotext />
            <div className="input-group">
              <label className="instructions">Nombre:</label>
              <div className="flex">
                <input className="input" type="text" name="name" placeholder="Nombre" required />
              </div>
            </div>

            <div className="input-group">
              <label className="instructions">Fecha de Nacimiento:</label>
              <div className="flex">
                <input className="input" id="birthdate" type="date" name="birthdate" required />
              </div>
            </div>

            <div className="input-group">
              <label className="instructions">Correo:</label>
              <div className="flex">
                <input className="input" type="email" name="email" placeholder="Correo" required />
              </div>
            </div>

            <div className="input-group">
              <label className="instructions">Contraseña:</label>
              <div className="flex">
                <input className="input" type="password" name="password" placeholder="Contraseña" required />
              </div>
            </div>

            <input className="submit" type="submit" value="Registrarse" />
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="gotologin">
            ¿Ya tienes una cuenta? <br />
            <a className="link" href="#login" onClick={handleClick}>
              Inicia sesión
            </a>
            <br />
          </div>
        </div>
      </div>

      <Footer />

      {/* Renderiza el componente PrivateText con el nuevo currUser */}
      {setCurrUser && <PrivateText currUser={setCurrUser} />}
    </>
  );
};

export default Signup;
