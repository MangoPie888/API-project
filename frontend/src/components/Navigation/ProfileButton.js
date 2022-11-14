import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {Link, useHistory} from "react-router-dom"
import "./Navigation.css";

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  // const openMenu = () => {
  //   // debugger
  //   if (showMenu) return;
  //   setShowMenu(!showMenu);
  // };
  


  useEffect(() => {
    if (!showMenu) return;
  

    const closeMenu = () => {
      // debugger
      document.addEventListener('click', closeMenu);
      setShowMenu(false);
    };

    // document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
    <div className="dropdown">
    <div className="user-button">
      <button className="dropdown-button">
        <i className="fa-solid fa-bars" id="line-icon"></i>
        <i className="fas fa-user-circle" />
      </button>
    </div>
  
          <div className="dropdown-menu">
        <ul className="profile-dropdown">
          <li>username: {user.username}</li>
          <li>useremail: {user.email}</li>
          <li ><Link to='/current' className="to-host-page">Clike here to host your home</Link></li>     {/*need a <link> tage */}
          <li>
            <button onClick={logout} className="logout-button">Log Out</button>
          </li>
        </ul>
        </div>
    
      </div>
    </>
  );
}

export default ProfileButton;