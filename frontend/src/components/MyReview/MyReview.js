import React, { useEffect, useState } from "react";
import { getCurrentUserReview } from "../../store/userReview";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import { deleteCurrentUserReview } from "../../store/userReview";
import {Link} from "react-router-dom"


import "./MyReview.css"


export default function MyReview() {
    const [reviewId,setReviewId] = useState()
  
    const dispatch = useDispatch()

    useEffect(()=>{
    dispatch(getCurrentUserReview())
},[])

    const myReview = useSelector((state)=>state.userReviews)

    const reviewArray = Object.values(myReview)
   

    const deleteUserReview=(e)=>{
        e.preventDefault()
        dispatch(deleteCurrentUserReview(reviewId))

    }


    return (
        <div className="my-review">
            <h2>My Review List</h2>
            {(!reviewArray.length && <p>You haven't post any review yet</p>) || reviewArray.length && reviewArray.map(review=>(
                <div className="my-review-info-div" key={review.id}>
                <p>spot name: <Link to ={`/${review.spotId}`} >{review.Spot.name}</Link></p>
                <p>create at :{review.createdAt.substr(0,10)}</p>
                <p>star(s): {review.stars}</p>
                <p>review: {review.review}</p>
                <form onSubmit={deleteUserReview}>
                <button className="review-delete-button" id={review.id} onClick={(e)=>(setReviewId(e.target.id))} >Delete</button>
                </form>
                </div>
                
                ))}
            </div>
 
        
       
    )
}