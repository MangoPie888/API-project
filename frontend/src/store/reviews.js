import { csrfFetch } from './csrf';


//action
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const displayReview = (reviews)=>{
    return{
        type:LOAD_REVIEWS,
        payload:reviews
    }
}





//thunk
export const getReviewsBySpotId=(data)=>async(dispatch)=>{
    console.log(data)
    const response = await csrfFetch(`/api/spots/${data}/reviews`)
    const reviews = await response.json();
    console.log(reviews)
    dispatch(displayReview(reviews))
    return response;

} 




//reducer
const intialState = {}
const reviewsReducer = (state=intialState, action) =>{
    let newState;
    switch(action.type) {
        case LOAD_REVIEWS:
            newState = Object.assign({},state);
            newState = action.payload
            return newState; 
        default:
            return state
    }
}

export default reviewsReducer;