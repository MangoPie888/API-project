import { csrfFetch } from './csrf';



//action
const LOAD_CURRENT ="reviews/LOAD_CURRENT"
const loadCurrentUserReview =(reviews) =>{
    return ({
        type:LOAD_CURRENT,
        reviews
    })
}

const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const removeReview = (reviewId) =>{
    return ({
        type:REMOVE_REVIEW,
        reviewId
    })
}


//thunk
export const getCurrentUserReview = () => async dispatch=>{
    const response = await csrfFetch('/api/reviews/current')
    const userReview =await response.json()
    console.log("current user's review",userReview)
    dispatch(loadCurrentUserReview(userReview.Review))
}

export const deleteCurrentUserReview = (reviewId) => async dispatch =>{
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
const userReviewsReducer = (state=intialState,action) =>{
    let newState;
    switch(action.type) {
            case LOAD_CURRENT:
            const userReviews = {};
            action.reviews.forEach((review)=>{
                userReviews[review.id] = review
            });
            return {
                ...userReviews,
            };
            case REMOVE_REVIEW:
                newState = Object.assign({},state);
                console.log("newState at reducer", newState)
                console.log("that review",newState[action.reviewId])
                delete newState[action.reviewId];
                return newState

    default:
        return state;
    }
}


export default userReviewsReducer