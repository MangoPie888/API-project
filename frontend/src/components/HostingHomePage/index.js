import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'
import EditFormModal from "../EditFormModal";
import CreateNewSpot from "../CreateNewSpot";







function HostingHomePage(){
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(0);
    const [clicked, setClicked] = useState(false)
    const [newSpotOpened, setNewSpotOpened] = useState(false)

    


    useEffect(()=>{
        dispatch(spotActions.getSpotsOfCurrentUser())
    },[])
    const spots = useSelector((state)=>{return(state.spots.Spots)})
    console.log(spots)


    const removeSpot = ()=>{
        dispatch(spotActions.deleteSpot(spotId))

    }

    if(spots) {
    return(
        <>
        <button onClick={()=>{setNewSpotOpened(true)}}>Create a New Spot</button>
       { newSpotOpened && <CreateNewSpot ModalClose={setNewSpotOpened}/>}
            {spots.map(spot=>{return(
                <div key={spot.id}>
                <h3>{spot.name}</h3>
                {spot.prevewImage && <img src={spot.prevewImage} />}
                <p>{spot.address}</p>
                <p>{spot.city}</p>
                <p>{spot.price}</p>
                <p>{spot.aveRating}</p>
                <form onSubmit={removeSpot}>
                <button type="submit" id={spot.id} onClick={e=>setSpotId(e.target.id)}>Delete</button>
                <button type="button" onClick={()=>{setClicked(!clicked)}}>Edit</button>
                </form>
                {clicked === true && <EditFormModal closeModal={setClicked}/>}
                </div>
            )})}

            

        </> 
    )}
}






export default HostingHomePage;