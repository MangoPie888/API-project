import { csrfFetch } from './csrf';


//action
const LOAD_SPOT = "spots/LOAD_SPOT"
const loadSpot = (spot)=>{
    return {
        type:LOAD_SPOT,
        payload:spot
    }
}

// const LOAD_CURRENT_SPOTS = 'spots/LOAD_CURRENT_SPOTS'
// const loadCurrentSpots = (spot) =>{
//     return {
//         type:LOAD_CURRENT_SPOTS,
//         payload:spot
//     }
// }

const ADD_ONE_SPOT= 'spot/ADD_ONE_SPOT'
const addOneSpot = (spot) =>{
    return{
        type:ADD_ONE_SPOT,
        payload:spot
    }
}


const UPDATE_SPOT= 'spot/UPDATE_SPOT'
const updateSpot = (spot) =>{
    return{
        type:UPDATE_SPOT,
        payload:spot
    }
}



const REMOVE_SPOT = "spot/REMOVE_SPOT"
const removeSpot = (spotId)=>{
    return({
        type:REMOVE_SPOT,
        payload:spotId
    })
}


//thunk

//homepage display all spots
export const displaySpot = () => async (dispatch) =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    // console.log(data)
    dispatch(loadSpot(data.Spots));
    return response
}

export const getSpotsOfCurrentUser=()=>async(dispatch)=>{
    const response = await csrfFetch('api/spots/current');
    const data = await response.json();
    console.log(data.Spots)
    dispatch(loadSpot(data.Spots))
}


// export const displaySpotWithId =(spotId)=> async(dispatch)=> {
//     const response = await csrfFetch(`api/spots/${spotId}`)
//     const data = await response.json();
//     // console.log(data)
//     dispatch(loadSpot(data))
//     return response;
// }

export const deleteSpot = (id)=> async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${id}`, {
        method:"delete",
    });
    dispatch(removeSpot(id));
    return response;
}

export const createNewSpot = (info)=> async(dispatch)=>{
    console.log('hited createNewSpot')
    const response = await csrfFetch('/api/spots', {
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(info)
    });

    const newSpot = await response.json();
    console.log("This is newSpot",newSpot)

    const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(info)
            }); 

    const newImage = await imageResponse.json();
    dispatch(loadSpot());
}



export const editSpot = (data) => async(dispatch) => {
    // console.log("checked")
    // console.log(data)
    const response = await csrfFetch(`/api/spots/${data.spot.id}`, {
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });


    const updatedSpot = await response.json();
    console.log(updatedSpot)
    dispatch(updateSpot(updatedSpot))
    return response
}




//reducer
const intialState = {}

const spotsReducer = (state=intialState, action) =>{
    let newState;
    switch(action.type) {
        case LOAD_SPOT:
            newState = Object.assign({},state);
            action.payload.forEach((element) =>{
                newState[element.id] = element
            })
            // newState = action.payload
            return newState; 
        case ADD_ONE_SPOT:
            // newState={...state, {action.payload}}
            // newState
            newState=action.payload
            return newState;
        case UPDATE_SPOT:
            newState= {...state}
            newState[action.payload.id] = action.payload
        case REMOVE_SPOT:
            newState = Object.assign({},state);
            newState.spots[action.payload] = null;
            return newState;
        default:
            return state
    }
}






export default spotsReducer