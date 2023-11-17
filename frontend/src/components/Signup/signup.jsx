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
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        SIGN-UP
        <br />

        <div className="name">
        Name: <input type="text" name="name" placeholder="name" />
        <br />
        </div>

        <div className="age">
        Birthdate: <input type="date" name="age" placeholder="age" />
        <br />
        </div>

        <div className="email">
        Email: <input type="email" name="email" placeholder="name@example.com" />
        <br />
        </div>

        <div className="password">
        Password: <input type="password" name="password" placeholder="password" />
        <br />
        </div>

        <input className="submit" type="submit" value="Submit" />
      </form>
      <br />
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <div className="gotologin">
        Already registered
      <div className="lnk">
        <a href="#login" onClick={handleClick}>Login</a>
      </div>
          here.
      </div>
    </div>
  );
};

export default Signup;
