import React, {useEffect,useState,useMemo}from "react";
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getReviewsBySpotId } from "../../store/reviews";
import { displaySpotWithId } from "../../store/singleSpot";

import {createNewReview} from '../../store/reviews'



function SpotDetailPage(){
    const [ostar, setStar] = useState('');
    const [review,setReview] = useState('');
    const [formDisplay, setFormDisplay] = useState(false)

    const stars = parseInt(ostar)
    console.log("type of star", typeof(stars),stars)


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

const sessionUserId = useSelector(state=>state.session.user.id)


const spot = useSelector(state=>{return(state.singleSpot[spotId])})
console.log(spot)

const reviews = useSelector(state=>state.reviews.Reviews)
console.log("reviews", reviews)
if(reviews === undefined) return null
// if(!Object.values(reviews).length) return null;
// console.log(spot)



const handleSubmission = (e)=>{
    e.preventDefault();
    

    dispatch(createNewReview({review,stars,spotId}))
}




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
            {sessionUserId !== spot.ownerId &&
                <form onSubmit={handleSubmission} hidden="" id="review-form">
                <label htmlFor="star">star</label>
                <select name="star" id="star" onChange={(e)=>{setStar(e.target.value)}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
        <textarea placeholder="new review" onChange={(e)=>{setReview(e.target.value)}}></textarea>
        <button>Create a Review</button>
        </form>

             }
            
        </div>
    )} 

};


export default SpotDetailPage;