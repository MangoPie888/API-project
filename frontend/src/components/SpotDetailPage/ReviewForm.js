import React, {useState}from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createNewReview } from "../../store/spotReviews";


const ReviewForm = ({spotId})=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ostar, setStar] = useState('');
    const stars = parseInt(ostar)
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
       dispatch(createNewReview({stars,review,spotId}))
    }





    return (
        <>
         {checkReview() === true && <form onSubmit={handleSubmission} hidden="" id="review-form">
                <label htmlFor="star">star</label>
                <select name="star" id="star" onChange={(e)=>{setStar(e.target.value)}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
        <textarea placeholder="new review" onChange={(e)=>{setReview(e.target.value)}} required></textarea>
        <button >Create a Review</button>
        </form> }      

        </>
    )

};



export default ReviewForm;