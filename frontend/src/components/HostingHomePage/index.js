import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'
import EditFormModal from "../EditFormModal";
import CreateNewSpot from "../CreateNewSpot";







function HostingHomePage(){
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(0);
    const [clicked, setClicked] = useState({})
    const [newSpotOpened, setNewSpotOpened] = useState(false)

    


    useEffect(()=>{
        dispatch(spotActions.getSpotsOfCurrentUser())
    },[])
    const spots = useSelector((state)=>{return(state.spots.Spots)})
    console.log(spots)


    const removeSpot = ()=>{
        dispatch(spotActions.deleteSpot(spotId))

    }

    const handleEditClick = (id) => {
        console.log('id:', id);
        setClicked({ [id]: !clicked[id] });
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
                </form>
                <span>
                    <button onClick={() => handleEditClick(spot.id)}>Edit</button>
                    {clicked[spot.id] === true && <EditFormModal closeModal={() => setClicked({ ...clicked, [spot.id]: false })}/>}
                </span>
                
                <button type="submit" id={spot.id}>Add Image</button>
            
               
                </div>
            )})}

            

        </> 
    )}
}






export default HostingHomePage;