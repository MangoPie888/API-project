import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'
import EditFormModal from "../EditFormModal";
import CreateNewSpot from "../CreateNewSpot";
import { Modal } from '../../context/Modal';
// import { getSpotsOfCurrentUser } from "../../store/currentSpot";
import { getSpotsOfCurrentUser } from "../../store/spots";

import "./index.css"







function HostingHomePage(){
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(0);
    const [clicked, setClicked] = useState({})

    const [showModal, setShowModal] = useState(false);

    


    useEffect(()=>{
     
        
        dispatch(getSpotsOfCurrentUser())
    },[])


    const removeSpot = (e)=>{
        e.preventDefault()
   
        dispatch(spotActions.deleteSpot(Number(spotId)))
      

    }



    const currentUserId = useSelector((state)=>{return(state.session.user.id)})

    const spots = useSelector((state)=>{return(state.allSpots)})
  
    const spotsArray = Object.values(spots);
 

    
    const currentUserSpots = spotsArray.filter((spot)=>{return(spot.ownerId == currentUserId)})
    


    
    const handleEditClick = (id) => {
  
        setClicked({ [id]: !clicked[id] });
    }

    // return (
    //     <div>This is current spot page</div>
    // )

    
    return(
        <div className="hosting-container">
        <div>
        <h2>My Hosting List</h2>
        <div className="create-button-div">
        <button className="create-button" onClick={() => setShowModal(true)}>Create a New Property</button>
        </div>
        </div>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <CreateNewSpot setShowModal={setShowModal}/>
        </Modal>
      )}
      <div className="my-hosting">
      {currentUserSpots.length > 0 && 
        currentUserSpots.map(spot=>{return(
                
                <div key={spot.id} className='spot-card'>
                <h5>property name: {spot.name}</h5>
                <Link to={`/${spot.id}`}><img src={spot.previewImage}></img></Link>
                <p>address: {spot.address}</p>
                <p>city: {spot.city}</p>
                <p>country: {spot.country}</p>
                <p>price: ${spot.price} night</p>
                {/* <p>description: ${spot.description}</p> */}
                {(!spot.aveRating && <p><span>&#9733;</span>New</p>) || (spot.aveRating && <p><span>&#9733;</span>{Number(spot.aveRating).toFixed(1)}</p>)}
                <div className="button-div">
                <form onSubmit={removeSpot}>
                <button className="delete-button" type="submit" id={spot.id} onClick={e=>setSpotId(e.target.id)}>Delete</button>
                </form>
                
                    <button className="edit-button" onClick={() => handleEditClick(spot.id)}>Edit</button>
                </div>
                    {/* {clicked[spot.id] === true && 
                    <Modal>
                        <EditFormModal />
                    </Modal> } */}
                    {clicked[spot.id] === true && 
                    <Modal >
                    <EditFormModal closeModal={() => setClicked({ ...clicked, [spot.id]: false })} spot={spot}/>
                    </Modal>}
                
                </div>
                
            )})
            
      }
      </div>
            

            

        </div> 
    )}







export default HostingHomePage;