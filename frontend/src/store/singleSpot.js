import { csrfFetch } from './csrf';

//action
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"
const loadOneSpot = (spot)=>{
    return {
        type:LOAD_ONE_SPOT,
        payload:spot
    }
}



//thunk
export const displaySpotWithId =(spotId)=> async(dispatch)=> {
    try{const response = await csrfFetch(`api/spots/${spotId}`)
    const data = await response.json();

    dispatch(loadOneSpot(data))}
    catch(error) {

        throw error;
    }
    
    
}




//reducer
const intialState = {}
const singleSpotReducer = (state=intialState, action) =>{
    switch(action.type) {
        case LOAD_ONE_SPOT:
           return {
            ...state,
            [action.payload.id]: action.payload
           }
        default:
            return state;
        }
        
    }

export default singleSpotReducer;