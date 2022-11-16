import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';
import { displaySpotWithId } from './singleSpot';


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

// const LOAD_CURRENT ="reviews/LOAD_CURRENT"
// const loadCurrentUserReview =(reviews) =>{
//     return ({
//         type:LOAD_CURRENT,
//         reviews
//     })
// }



//thunk
export const getReviewsBySpotId=(data)=>async(dispatch)=>{

    const response = await csrfFetch(`/api/spots/${data}/reviews`)
    const reviews = await response.json();

    dispatch(displayReview(reviews.Reviews))
    return response;

} 



export const createNewReview =(data) => async(dispatch) =>{
    const {spotId} = data;
   
    const response = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
 
    if(!response.ok) {
        let error;
        if(response.status === 403) {
            error = await response.json();
           
            throw new ValidationError(error.message);
        }
    }
    const newReview = await response.json();

    const review = await csrfFetch(`/api/spots/${newReview.spotId}/reviews`)
    const fullReview =await review.json()
   
    const reviewArry =Object.values(fullReview.Reviews) 

    const createdReview = reviewArry.filter((review)=>{return(review.id == newReview.id)})
    const finalReview = createdReview[0]
   
    dispatch(addReview(finalReview))
    dispatch(displaySpotWithId(spotId))
    // return newReview;

}


export const deleteReview = (data) => async dispatch =>{
    const {reviewId,spotId} = data
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:'delete',
    });

    dispatch(removeReview(reviewId));
    dispatch(displaySpotWithId(spotId))

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
        
            newState = {...state,[action.newReview.id]:action.newReview}
            return newState
        case REMOVE_REVIEW:
            newState = Object.assign({},state);
    
            delete newState[action.reviewId];
            return newState
        
        // case LOAD_CURRENT:
        //     const userReviews = {};
        //     action.reviews.forEach((review)=>{
        //         userReviews[review.id] = review
        //     });
        //     return {
        //         ...userReviews,
        //     };

        default:
            return state
    }
}

export default reviewsReducer;