import React, {useState}from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createNewReview } from "../../store/spotReviews";

import './ReviewForm.css'


const ReviewForm = ({spotId})=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const [stars, setStar] = useState('');
    // const stars = parseInt(ostar)
    const [review,setReview] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false)

   

    const spotReviews = useSelector(state => state.spotReviews)
    const spotReviewArray = Object.values(spotReviews);
    // console.log("spotReviewArray",spotReviewArray)

    const sessionUserId = useSelector(state => state.session.user.id)



    const checkReview = ()=>{
        for(let i = 0 ; i <spotReviewArray.length; i++) {
            let review = spotReviewArray[i];
            if(review.userId === sessionUserId) {
                return false
            }
        }
        return true;
    }

    const handleSubmission = async(e)=>{
        // e.preventDefault()
        // console.log(stars)

        if(!stars) {
            e.preventDefault()
           return alert("You need to rate the spot by clicking the stars")
        }
       dispatch(createNewReview({stars,review,spotId}))
    }

    const starDiv = document.querySelector('.stars')
   const starsEmoji = document.querySelectorAll('.stars a')

   starsEmoji.forEach((star,clicledIdx)=>{
    star.addEventListener('click', ()=>{
        starDiv.classList.add("disabled")
        starsEmoji.forEach((otherStars,otherIdx)=>{
            if(otherIdx <= clicledIdx) {
                otherStars.classList.add("active")

            }
        })
        console.log(`The ${clicledIdx+1} star is clicked`)
        setStar(clicledIdx+1)
    })
   })

  



    return (
        <div className="reviewForm">
         {checkReview() === true &&<fieldset><form onSubmit={handleSubmission} hidden="" id="review-form">
                
        <textarea className="reviewbox" placeholder="please write your review here" onChange={(e)=>{setReview(e.target.value)}} required></textarea>
        <div className="stars">
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                </div>
        <button className="create-review-button">Create a Review</button>
        </form></fieldset>  }      

        </div>
    )

};



export default ReviewForm;