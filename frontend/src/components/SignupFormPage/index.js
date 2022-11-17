import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {

  
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {   
      dispatch(sessionActions.signup({ firstName, lastName,email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.message) { 
            setErrors(Object.values(data.errors));
            };
      
        });
    }
    else{setErrors(['Confirm Password must be the same as the Password']);}
    // setSignUpClicked(false)
  };


  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <ul className="error-list" >
        {errors.map((error, idx) => <li className="error-message"  key={idx}>{error}</li>)}
      </ul>
        <input className="sign-up-input"
          placeholder="FirstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input className="sign-up-input"
          placeholder="LastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input className="sign-up-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input className="sign-up-input"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input className="sign-up-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input className="sign-up-input"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      <button className="sign-up-botton" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;