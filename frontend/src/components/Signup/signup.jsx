import React, { useRef } from "react";
import Footer from "../Footer/Footer.jsx"
import Logotext from "../Logotext/Logotext.jsx";
import './Signup.css';

const Signup = ({ setCurrUser, setShow }) => {
  const formRef = useRef()
  const signup = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/signup"
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": 'application/json',
          "accept": "application/json"
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (!response.ok) throw data.error
      localStorage.setItem('token', response.headers.get("Authorization"))
      setCurrUser(data)
    } catch (error) {
      console.log("error", error)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)

    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
        name: data.name,
        birthdate: data.birthdate,
      },
    };

    signup(userInfo, setCurrUser)
    e.target.reset()
  }
  const handleClick = e => {
    e.preventDefault()
    setShow(true)
  }

  return (
    <>
      <div className="background1">
        <div className="form-container">
          <h2 className="titlesing">Sign up here</h2>
          <form className="singup" ref={formRef} onSubmit={handleSubmit}>
            <Logotext />
            <div className="input-group">
              <label className="instrutions">Name:</label>
              <div className="flex">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
                <input className="input" type="text" name="name" placeholder="name" />
              </div>
            </div>

            <div className="input-group">
              <label className="instrutions">Birthdate:</label>
              <input className="input" type="date" name="birthdate" />
            </div>

            <div className="input-group">
              <label className="instrutions">Email:</label>
              <div className="flex">
                <svg fill="none" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg" className="icon">
                  <path stroke-linejoin="round" stroke-linecap="round" stroke="#fff" stroke-width="1.5" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                  <path stroke-linejoin="round" stroke-width="1.5" stroke="#fff" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                </svg>
                <input className="input" type="email" name="email" />
              </div>
            </div>

            <div className="input-group">
              <label className="instrutions">Password:</label>
              <div className="flex">
                <svg stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon" width="30" height="30">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
                <input className="input" type="password" name="password" />
              </div>
            </div>

            <input className="submit" type="submit" value="SignUp" />
          </form>

          <div className="gotologin">
            ¿Ya tienes una cuenta? <br />
            <a className="link" href="#login" onClick={handleClick}>
              Inicia sesión</a>
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
