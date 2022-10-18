import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'







function HostingHomePage(){
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(0);

    


    useEffect(()=>{
        dispatch(spotActions.getSpotsOfCurrentUser())
    },[])
    const spots = useSelector((state)=>{return(state.spots)})
    console.log(spots)


    const removeSpot = (e)=>{
        dispatch(spotActions.deleteSpot(spotId))

    }


    return(
        <>
            <div>
            <p>Hello</p>
            {/* {spots.map(spot=>{return(
                <div key={spot.id}>
                <p>{spot.name}</p>
                <p>{spot.address}</p>
                <form onSubmit={removeSpot}>
                <button type="submit" id={spot.id} onClick={e=>setSpotId(e.target.id)}>Delete</button>
                <button>Edit</button>
                </form>
                </div>
            )})}
         */}
            </div>
        </>
    )
}




export default HostingHomePage;