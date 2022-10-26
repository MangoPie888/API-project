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
    const response = await csrfFetch(`api/spots/${spotId}`)
    const data = await response.json();
    // console.log(data)
    dispatch(loadOneSpot(data))
    return response;
}




//reducer
const intialState = {}
const singleSpotReducer = (state=intialState, action) =>{
    let newState ={...state};
    switch(action.type) {
        case LOAD_ONE_SPOT:
            newState = action.payload
            return newState; 
        default:
            return state;
        }
        
    }

export default singleSpotReducer;