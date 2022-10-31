import React, {useState}from "react";
import { useDispatch } from "react-redux";
import { createNewReview } from "../../store/spotReviews";

const ReviewForm = ({spotId})=>{
    const [ostar, setStar] = useState('');
    const [review,setReview] = useState('');


    const stars = parseInt(ostar)
    console.log("type of star", typeof(stars),stars)

    const dispatch = useDispatch();
    const handleSubmission = (e)=>{
        e.preventDefault();
        
    
        dispatch(createNewReview({review,stars,spotId}))
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
        <button>Create a Review</button>
        </form>

        </>
    )

};



export default ReviewForm;