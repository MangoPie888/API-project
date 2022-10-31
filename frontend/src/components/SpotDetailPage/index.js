import React, {useEffect,useState,useMemo}from "react";
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getReviewsBySpotId } from "../../store/reviews";
import { displaySpotWithId } from "../../store/singleSpot";



function SpotDetailPage(){

 console.log(1)

    const dispatch = useDispatch()
    const {spotId} = useParams();
    // console.log("spotId",spotId)
    

useEffect(()=>{
    console.log(4)
dispatch(displaySpotWithId(spotId))
dispatch(getReviewsBySpotId(spotId))
    console.log(5)

},[])

const spot = useSelector(state=>{return(state.singleSpot[spotId])})
console.log(spot)

const reviews = useSelector(state=>state.reviews.Reviews)
console.log("reviews", reviews)
if(reviews === undefined) return null
// if(!Object.values(reviews).length) return null;
// console.log(spot)


    console.log(6)
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
        {spot.Owner &&  <div>
            {spot.Owner.firstName} {
                spot.Owner.lastName
            }
        </div>}
        <div>
            <h4>Reviews</h4>
            {reviews.length === 0 ? <p>there is no review for this spot</p> : reviews.map(review=>{return(<div key={review.id}>
            <p>{review.User.firstName} {review.User.lastName}</p>
            <p>{review.review}</p>
            </div> 
            )})}
        </div>
        </div>
    )} 

};


export default SpotDetailPage;