import React, {useEffect} from "react";
import {useSelector,useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots'






function HostingHomePage(){
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    console.log(userId, typeof(userId))
    console.log(sessionUser)
    const allSpots = useSelector(state=>state.spots)
    console.log(allSpots)
    const objArr = Object.values(allSpots)
    console.log(objArr)

    const userSpots= objArr.filter(spot=>{return(spot.ownerId == userId)})
    console.log(userSpots)



    useEffect(()=>{
        dispatch(spotActions.displaySpot())
    },[])





    return(
        <>
            <div>
               {userSpots.map(spot=>{return(
                <div>
                <p>{spot.name}</p>
                <p>{spot.address}</p>
                </div>
               )})}
            </div>
        </>
    )
}




export default HostingHomePage;