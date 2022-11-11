import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormPage from '../SignupFormPage';
import {Modal} from '../../context/Modal'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log(isLoaded)

  const [signUpClicked, setSignUpClicked] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div>
        <LoginFormModal />
        <button className='signup-button' onClick={()=>{setSignUpClicked(true)}}>Sign Up</button>
        {signUpClicked && (
          <Modal onClose={()=>setSignUpClicked(false)}>
            <SignupFormPage/>
          </Modal>
        )
          }
    
      </div>
      </>
    );
  }

  return (
    <div className='navigation-container'>
      <div className='home-link'>
        <NavLink exact to="/"><img className="home-icon" src='https://user-images.githubusercontent.com/26607023/66323837-52dbbf80-e91c-11e9-833b-a7ea66e2a9eb.png'></img></NavLink>
      </div>
        {isLoaded && sessionLinks}
   
    </div>
  );
}

export default Navigation;