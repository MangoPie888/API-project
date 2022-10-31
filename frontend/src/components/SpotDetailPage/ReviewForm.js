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

   

    const spotReviews = useSelector(state => state.spotReviews)
    const spotReviewArray = Object.values(spotReviews);
    // console.log("spotReviewArray",spotReviewArray)

    const sessionUserId = useSelector(state => state.session.user.id)

    const checkOverWriteReivew = ()=>{
        for(let i = 0; i <spotReviewArray.length; i++) {
            let item = spotReviewArray[i];
            if(item.userId === sessionUserId) {
                return true
            }
            return false;
        }
    }
    

   
    const handleSubmission = async(e)=>{
        e.preventDefault();
        
        let createdReview;
        try{
            createdReview = await dispatch(createNewReview({review,stars,spotId}));
        } catch (error) {
           console.log("catchedError",error)
           if(error.status === 403) {
            alert("User already has a review for this spot")
            const form = document.getElementById('review-form')
            form.style.display = "none"
           }
        }
        if(createdReview) {
            history.push(`/${spotId}`)
        }    
    }





    return (
        <>
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
        <button >Create a Review</button>
        </form>

        </>
    )

};



export default ReviewForm;