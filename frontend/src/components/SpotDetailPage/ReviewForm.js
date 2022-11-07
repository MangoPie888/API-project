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
           return alert("You need to rate the spot by clicking the starts")
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
         {checkReview() === true && <form onSubmit={handleSubmission} hidden="" id="review-form">
                {/* <label htmlFor="star">star</label>
                <select name="star" id="star" onChange={(e)=>{setStar(e.target.value)}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select> */}
                <div className="stars">
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                </div>
        <textarea placeholder="new review" onChange={(e)=>{setReview(e.target.value)}} required></textarea>
        <button className="create-review-button">Create a Review</button>
        </form> }      

        </div>
    )

};



export default ReviewForm;