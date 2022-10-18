import React, {useEffect,useState,useMemo}from "react";
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import * as spotActions from '../../store/spots'



function SpotDetailPage(){

//  console.log(1)

    const dispatch = useDispatch()
    const {spotId} = useParams();
    // console.log("spotId",spotId)
    

useEffect(()=>{
    // console.log(4)
dispatch(spotActions.displaySpotWithId(spotId))
    // console.log(5)

},[])

const spot = useSelector(state=>{return(state.spots)})
// console.log(spot)


    // console.log(6)
    if(spot) {
    return (
        <div>
        <div>
            <h1>{spot.name}</h1>
        </div>
        <div>
            <p>⭐ {spot.avgStarRating}</p>
            <p>{spot.city}</p>
            <p>{spot.state}</p>
            <p>{spot.country}</p>
        </div>
        {spot.SpotImages && <div>
        {spot.SpotImages.map((image)=>{return(
            <img key={image.id}src={image.url}/>
        )})}
        </div> }
        {/* <div>
        {spot.SpotImages.map((image)=>{return(
            <img src={image.url}/>
        )})}
        </div>
        <div>
            {spot.Owner.firstName} {
                spot.Owner.lastName
            }
        </div> */}
        {spot.Owner &&  <div>
            {spot.Owner.firstName} {
                spot.Owner.lastName
            }
        </div>}
        <div>
            <h4>Reviews</h4>
        </div>
        </div>
    )} else return null

};


export default SpotDetailPage;