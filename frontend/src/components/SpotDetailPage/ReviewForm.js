import React, {useState}from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createNewReview } from "../../store/spotReviews";

import './ReviewForm.css'


const ReviewForm = ({spotId})=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const [stars, setStar] = useState('');
   
    const [review,setReview] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false)

   

    const spotReviews = useSelector(state => state.spotReviews)
    const spotReviewArray = Object.values(spotReviews);
    

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
        e.preventDefault()
        if(!stars) {
           return alert("You need to rate the spot by clicking the stars")
        }
       
       dispatch(createNewReview({stars,review,spotId}))
    }

//     const starDiv = document.querySelector('.stars')
//    const starsEmoji = document.querySelectorAll('.stars a')

//    starsEmoji.forEach((star,clicledIdx)=>{
//     star.addEventListener('click', ()=>{
//         starDiv.classList.add("disabled")
//         starsEmoji.forEach((otherStars,otherIdx)=>{
//             if(otherIdx <= clicledIdx) {
//                 otherStars.classList.add("active")

//             }
//         })

//         setStar(clicledIdx+1)
//     })
//    })

  



    return (
        <div className="reviewForm">
         {checkReview() === true &&<form  onSubmit={handleSubmission} hidden="" id="review-form">
                
        <div className="rating">
        <input type="radio" id="star5" name="rating" value="5" onClick={(e)=>{setStar(e.target.value)}}/>
        <label htmlFor="star5">5 stars</label>
        <input type="radio" id="star4" name="rating" value="4" onClick={(e)=>{setStar(e.target.value)}} />
        <label htmlFor="star4">4 stars</label>
        <input type="radio" id="star3" name="rating" value="3" onClick={(e)=>{setStar(e.target.value)}} />
        <label htmlFor="star3">3 stars</label>
        <input type="radio" id="star2" name="rating" value="2" onClick={(e)=>{setStar(e.target.value)}} />
        <label htmlFor="star2">2 stars</label>
        <input type="radio" id="star1" name="rating" value="1" onClick={(e)=>{setStar(e.target.value)}} />
        <label htmlFor="star1">1 star</label>
        </div> 
        <textarea className="reviewbox" placeholder="please write your review here" onChange={(e)=>{setReview(e.target.value)}} required></textarea>   
        <button className="create-review-button">Create a Review</button>
        
                {/* <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a>
                <a>⭐</a> */}
        </form> }      

        </div>
    )

};



export default ReviewForm;