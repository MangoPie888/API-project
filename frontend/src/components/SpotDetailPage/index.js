import React, {useEffect,useState,useMemo}from "react";
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getReviewsBySpotId } from "../../store/spotReviews";
import { displaySpotWithId } from "../../store/singleSpot";

import ReviewForm from "./ReviewForm";
import "./SpotDetailPage.css"



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

const sessionUser= useSelector(state=>state.session.user)


const spot = useSelector(state=>{return(state.singleSpot[spotId])})
console.log(spot)

const reviews = useSelector(state=>state.spotReviews)

const reviewsArray = Object.values(reviews)
console.log("reviewsArray",reviewsArray)
// if(reviews === undefined) return null
// if(reviewsArray.length === 0) return null
// if(!Object.values(reviews).length) return null;
// console.log(spot)



// const handleSubmission = (e)=>{
//     e.preventDefault();
    

//     dispatch(createNewReview({review,stars,spotId}))
// }




    console.log(6)
    if(spot) {
    return (
        <div className="detailspot-container">
        <div>
            <h1>{spot.name}</h1>
        </div>
        <div className="title-info">
            <p><span>&#9733;</span> {spot.avgStarRating}</p>
            <p>{spot.city},{spot.state},{spot.country}</p>
        </div>
        {spot.SpotImages && <div>
        {spot.SpotImages.map((image)=>{return(
            <img key={image.id}src={image.url}/>
        )})}
        </div> }
        {spot.Owner &&  <div>
            hosted by {spot.Owner.firstName} {
                spot.Owner.lastName
            }
        </div>}
        <hr className="dotted"></hr>
        <div >
            <h4>Reviews</h4>
            {reviewsArray.length === 0 ? <p>there is no review for this spot</p> : reviewsArray.map(review=>{return(<div className="reviewBox" key={review.id}>
            <p>{review.User.firstName}</p>
            <p>{review.review}</p>
            </div> 
            )})}
        </div>
                {(sessionUser && (sessionUser.id !== spot.ownerId)) && <ReviewForm spotId={spotId}/>}
            {/* <form onSubmit={handleSubmission} hidden="" id="review-form">
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
        </form> */}

            
        </div>
    )} 

};


export default SpotDetailPage;