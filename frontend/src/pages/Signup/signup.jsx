import React, { useRef, useState } from "react";
import './signup.css';

const Signup = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const [error, setError] = useState(null);

  const signup = async (userInfo) => {
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error desconocido en el servidor");
      }

      const data = await response.json();
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
      setError(null);

      // Redirección directa
      window.location.href = "/login";
    } catch (error) {
      setError(error.message || "Error desconocido");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
        name: data.name,
        age: data.age,
      },
    };
    signup(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <body className="body1">
    <div>
      <h2 className="titlesing">Sign up here</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="name">
        Name: <input className="input" type="text" name="name" placeholder="name" />
        <br />
        </div>

        <div className="age">
        Age:<input className="input" type="number" name="age" placeholder="18" />
        <br />
        </div>

        <div className="email">
        Email: <input className="input" type="email" name="email" placeholder="name@example.com" />
        <br />
        </div>

        <div className="password">
        Password: <input className="input" type="password" name="password" placeholder="password" />
        <br />
        </div>

        <input className="submit" type="submit" value="SignUp" />
      </form>
      <br />
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <div className="gotologin">
        Already registered   
        <br />
        <a className="link" href="#login" onClick={handleClick}>
          Login</a> 
          <br />
        here.
      </div>
    </div>
    </body>
  );
};

export default Signup;
