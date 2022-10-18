import { csrfFetch } from './csrf';


//action
const ADD_SPOT = "spots/ADD_SPOT"
const addSpot = (spot)=>{
    return {
        type:ADD_SPOT,
        payload:spot
    }
}

// const ADD_SPOT_DETAIL = 'spots/ADD_SPOT_DETAIL';
// const addSpotDetail = (spotId)=>{
//     return {
//         type:ADD_SPOT_DETAIL,
//         payload:spotId
//     }
// }


const REMOVE_SPOT = "spot/REMOVE_SPOT"
const removeSpot = (spotId)=>{
    return({
        type:REMOVE_SPOT,
        payload:spotId
    })
}


//thunk

export const displaySpot = () => async (dispatch) =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    // console.log(data)
    dispatch(addSpot(data.Spots));
    return response
}

export const getSpotsOfCurrentUser=()=>async(dispatch)=>{
    const response = await csrfFetch('api/spots/current');
    const data = await response.json();
    console.log(data)
    dispatch(addSpot(data))
}


export const displaySpotWithId =(spotId)=> async(dispatch)=> {
    const response = await csrfFetch(`api/spots/${spotId}`)
    const data = await response.json();
    // console.log(data)
    dispatch(addSpot(data))
    return response;
}

export const deleteSpot = (id)=> async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${id}`, {
        method:"DELETE",
    });
    dispatch(removeSpot(id));
    return response;
}



export const editSpot = () => async(dispatch) => {
    
}
// export const displayCurrentUserSpot = (user)=>async(dispatch)=>{
//     const response = await csrfFetch('/current',{
//         method:"GET",
//         body: JSON.stringify({user})
//     });

//     const data = await response.json();
//     dispatch(addSpot(data))
//     return response;

// }





//reducer
const intialState = {}

const spotsReducer = (state=intialState, action) =>{
    let newState;
    switch(action.type) {
        case ADD_SPOT:
            newState = Object.assign({},state);
            // action.payload.forEach((element) =>{
            //     newState[element.id] = element
            // })
            newState = action.payload
            return newState; 
        // case ADD_SPOT_DETAIL:
        //     newState = Object.assign({},state);
        //     newState = action.payload
        //     return newState
        case REMOVE_SPOT:
            newState = Object.assign({},state);
            newState.spots[action.payload] = null;
            return newState;
        default:
            return state
    }
}






export default spotsReducer