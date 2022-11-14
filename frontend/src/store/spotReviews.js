import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';


//action
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const displayReview = (reviews)=>{
    return{
        type:LOAD_REVIEWS,
        reviews
    }
}


const ADD_NEW_REVIEW = 'reviews/ADD_NEW_REVIEW';
const addReview = (newReview)=>{
    return {
        type:ADD_NEW_REVIEW,
        newReview
    }

}


const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const removeReview = (reviewId) =>{
    return ({
        type:REMOVE_REVIEW,
        reviewId
    })
}




//thunk
export const getReviewsBySpotId=(data)=>async(dispatch)=>{
    console.log("data",data)
    const response = await csrfFetch(`/api/spots/${data}/reviews`)
    const reviews = await response.json();
    console.log("thunkreviews",reviews.Reviews)
    dispatch(displayReview(reviews.Reviews))
    return response;

} 



export const createNewReview =(data) => async(dispatch) =>{

    console.log("hit createNewReview Thunk")
    const response = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log("beforeIFthunk")
    if(!response.ok) {
        let error;
        if(response.status === 403) {
            error = await response.json();
            console.log("thunkerror",error)
            throw new ValidationError(error.message);
        }
    }
    const newReview = await response.json();
    console.log("newReview", newReview)
    dispatch(addReview(newReview));
    return newReview;

}


export const deleteReview = (reviewId) => async dispatch =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:'delete',
    });
    console.log("delet thunk")
    dispatch(removeReview(reviewId));
    console.log("delet thunk end")
    return response;
} 




//reducer
const intialState = {}
const reviewsReducer = (state=intialState, action) =>{
    let newState;
    switch(action.type) {
        case LOAD_REVIEWS:
            const allReviews = {};
            action.reviews.forEach((review)=>{
                allReviews[review.id] = review
            });
            return {
                ...allReviews,
            };
        case ADD_NEW_REVIEW:
            newState = Object.assign({},state);
            console.log("newState",newState)
            newState[action.newReview.id] = action.newReview
        return {
            ...state,
            ...newState
        } 
        case REMOVE_REVIEW:
            newState = Object.assign({},state);
            console.log("newState at reducer", newState)
            console.log("that review",newState[action.reviewId])
            delete newState[action.reviewId];
            return newState
        default:
            return state
    }
}

export default reviewsReducer;