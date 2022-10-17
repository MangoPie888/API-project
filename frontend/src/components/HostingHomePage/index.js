import React, {useEffect,useState} from "react";
import {useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots'







function HostingHomePage(){
    const history = useHistory()
    const dispatch = useDispatch();

    const [spotId, setSpotId] = useState(0);

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    // console.log(userId, typeof(userId))
    // console.log(sessionUser)
    const allSpots = useSelector(state=>state.spots)
    // console.log(allSpots)
    const objArr = Object.values(allSpots)
    // console.log(objArr)

    const userSpots= objArr.filter(spot=>{return(spot.ownerId == userId)})
    console.log(userSpots)



    useEffect(()=>{
        dispatch(spotActions.displaySpot())
    },[])


    const removeSpot = (e)=>{
        // e.preventDefault();
        dispatch(spotActions.deleteSpot(spotId))
        // history.push('/current')


    }


    return(
        <>
            <div>
            {userSpots.map(spot=>{return(
                <div key={spot.id}>
                <p>{spot.name}</p>
                <p>{spot.address}</p>
                <form onSubmit={removeSpot}>
                <button type="submit" id={spot.id} onClick={e=>setSpotId(e.target.id)}>Delete</button>
                <button>Edit</button>
                </form>
                </div>
            )})}
        
            </div>
        </>
    )
}




export default HostingHomePage;