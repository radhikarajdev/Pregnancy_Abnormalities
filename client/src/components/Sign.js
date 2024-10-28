import './Sign.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Sign() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/sign', {name, email, password})
    .then(result => {console.log(result)
      window.location.href = '/login';
    })
    .catch(err=> console.log(err))
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}> 
          <div className="mb-3">
            <label htmIFor="email">
              <strong>Name</strong>
            </label>
            <input type="text" 
            placeholder="Enter Name" 
            autoComplete="off" 
            name= "email" 
            className="form-control rounded-g"
            onChange={(e)=>setName(e.target.value)}
            />
          </div> 
          <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input type="email" 
              placeholder="Enter Email" 
              autoComplete="off" name="email" 
              className=" form-control rounded-g"
              onChange={(e)=>setEmail(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
              </label>
                <input 
                type="password"
                placeholder="Enter Password" 
                name="password" 
                className=" form-control rounded-0" 
                onChange={(e)=>setPassword(e.target.value)}
                />
          </div>
          <button type="submit" className="bt btn-success w-100 rounded-0">
            Submit
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login" className="bt btn-default border w-100 bg-light text-decoration-none">
          Login 
        </Link>
      </div>
    </div>
  );
}

export default Sign;

