import React, { useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Logotext from "../Logotext/Logotext";
import "./Login.css";

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const [error, setError] = useState(null);

  const login = async (userInfo) => {
    const url = "http://localhost:3001/login";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error desconocido en el servidor");
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
      setError(null);
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
    login(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <div>
      <div className="background2">
        <div>
          <h2 className="titlesing">Login</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <Logotext></Logotext>

            <div className="email">
              Email: <input className="input" type="email" name="email" placeholder="name@example.com" />
              <br />
            </div>

           <div className="input-group">
              <label className="instrutions">Password:</label>
              <div className="password">
                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon" width="20" height="20">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
                <input className="input" type="password" name="password" />
              </div>
            </div>

            <input className="submit" type="submit" value="Login" />
          </form>
          <br />
          {error && <div style={{ color: "red" }}>Error: {error}</div>}
          <div className="gotologin">
            Aun no tienes una cuenta?
            <br />
            <a className="link" href="#signup" onClick={handleClick}>
              registrate</a> 
            <br />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
