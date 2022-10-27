import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'
import EditFormModal from "../EditFormModal";
import CreateNewSpot from "../CreateNewSpot";
import { Modal } from '../../context/Modal';

import "./index.css"







function HostingHomePage(){
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(0);
    const [clicked, setClicked] = useState({})

    const [showModal, setShowModal] = useState(false);

    


    // useEffect(()=>{
    //     dispatch(spotActions.getSpotsOfCurrentUser())
    // },[])
    const currentUserId = useSelector((state)=>{return(state.session.user.id)})
    // console.log("currentUserId",currentUserId)
    const spots = useSelector((state)=>{return(state.allSpots)})
    // console.log(spots)
    const spotsArray = Object.values(spots);
    // console.log(spotsArray)

    const currentUserSpots = spotsArray.filter((spot)=>{return(spot.ownerId == currentUserId)})
    // console.log("currentUserSpots",currentUserSpots)


    const removeSpot = ()=>{
        dispatch(spotActions.deleteSpot(spotId))

    }

    const handleEditClick = (id) => {
        console.log('id:', id);
        setClicked({ [id]: !clicked[id] });
    }

    if(Object.keys(spots).length > 0) {
    return(
        <div className="hosting-container">
        <button onClick={() => setShowModal(true)}>Create a New Spot</button>
        {showModal && (
        <Modal >
        <CreateNewSpot setShowModal={setShowModal}/>
        </Modal>
      )}
            {currentUserSpots.map(spot=>{return(
                <div key={spot.id}>
                <h3>{spot.name}</h3>
                <img src={spot.previewImage}></img>
                <p>{spot.address}</p>
                <p>{spot.city}</p>
                <p>{spot.country}</p>
                <p>{spot.price}</p>
                <p>{spot.aveRating}</p>
                <form onSubmit={removeSpot}>
                <button type="submit" id={spot.id} onClick={e=>setSpotId(e.target.id)}>Delete</button>
                </form>
                <span>
                    <button onClick={() => handleEditClick(spot.id)}>Edit</button>
                    {clicked[spot.id] === true && <EditFormModal closeModal={() => setClicked({ ...clicked, [spot.id]: false })} spot={spot}/>}
                </span>
                
                </div>
            )})}

            

        </div> 
    )}
}






export default HostingHomePage;