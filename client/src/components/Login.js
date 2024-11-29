import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { name, email, password })
      .then(result => {
        if (result.data === "Success") {
          window.location.href = '/'; // Redirect on successful login
        } else {
          setErrorMessage(result.data); // Set error message if login fails
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
