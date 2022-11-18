import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {Link, useHistory} from "react-router-dom"
import "./Navigation.css";
import { cleanupStore } from "../../store/userReview";

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
    
      document.addEventListener('click', closeMenu);
      setShowMenu(false);
    };


  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(cleanupStore())
    history.push("/")
   
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
          <li className="username-email">username: {user.username}</li>
          <li className="username-email">Email: {user.email}</li>
          <hr></hr>
          <li ><Link to='/current' className="to-host-page">Become a Host</Link></li> 
          <li><Link  to='/reviews/current' className="myreview-click">My Reviews</Link></li>
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