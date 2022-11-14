import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoUser=()=>{
    setCredential("demo@user.io")
    setPassword("password")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <ul className="errorList">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <div className="login">
        <input className="login-input"
          type="text"
          value={credential}
          placeholder='Enter Username or Email'
          onChange={(e) => setCredential(e.target.value)}
          required
        />
    
        <input className="login-input"
          type="password"
          value={password}
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    
      <button className="login-buttons" type="submit">Log In</button>
      
    </form>
    <button className="login-buttons" onClick={demoUser} type="submit">Demo User</button>
    
    </>
  );
}

export default LoginForm;