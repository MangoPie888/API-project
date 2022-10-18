import { csrfFetch } from './csrf';


//action
const LOAD_SPOT = "spots/LOAD_SPOT"
const loadSpot = (spot)=>{
    return {
        type:LOAD_SPOT,
        payload:spot
    }
}

const ADD_ONE_SPOT= 'spot/ADD_ONE_SPOT'
const addOneSpot = (spot) =>{
    return{
        type:ADD_ONE_SPOT,
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
    console.log(data)
    dispatch(loadSpot(data))
}


export const displaySpotWithId =(spotId)=> async(dispatch)=> {
    const response = await csrfFetch(`api/spots/${spotId}`)
    const data = await response.json();
    // console.log(data)
    dispatch(loadSpot(data))
    return response;
}

export const deleteSpot = (id)=> async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${id}`, {
        method:"delete",
    });
    dispatch(removeSpot(id));
    return response;
}

export const createNewSpot = (info)=> async(dispatch)=>{
    const response = await csrfFetch('/api/spots', {
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(info)
    });

    const newSpot = await response.json();
    console.log(newSpot)
    dispatch(addOneSpot(newSpot));
    return newSpot
}



export const editSpot = () => async(dispatch) => {
    
}




//reducer
const intialState = {}

const spotsReducer = (state=intialState, action) =>{
    let newState ={...state};
    switch(action.type) {
        case LOAD_SPOT:
            newState = Object.assign({},state);
            // action.payload.forEach((element) =>{
            //     newState[element.id] = element
            // })
            newState = action.payload
            return newState; 
        case ADD_ONE_SPOT:
            // newState={...state, {action.payload}}
            // newState
            newState=action.payload
            return newState;
        case REMOVE_SPOT:
            newState = Object.assign({},state);
            newState.spots[action.payload] = null;
            return newState;
        default:
            return state
    }
}






export default spotsReducer