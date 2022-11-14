import { csrfFetch } from './csrf';
// import { getSpotsOfCurrentUser } from './currentSpot';


//action
const LOAD_SPOT = "spots/LOAD_SPOT"
const loadSpot = (spot)=>{
    return {
        type:LOAD_SPOT,
        payload:spot
    }
}

const LOAD_CURRENT_SPOTS = 'spots/LOAD_CURRENT_SPOTS'
const loadCurrentSpots = (spot) =>{
    return {
        type:LOAD_CURRENT_SPOTS,
        payload:spot
    }
}

const ADD_ONE_SPOT= 'spot/ADD_ONE_SPOT'
const addOneSpot = (spot,newImage) =>{
    return{
        type:ADD_ONE_SPOT,
        spot,newImage
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
        spotId
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
    dispatch(loadCurrentSpots(data.Spots))
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
    console.log("newSpot Id", newSpot.id)

    const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(info)
            }); 

    const newImage = await imageResponse.json();
    console.log("newImage",newImage)
    newSpot.previewImage = newImage.url
    console.log(newSpot)
    dispatch(addOneSpot(newSpot,newImage));
    dispatch(getSpotsOfCurrentUser());
}



export const editSpot = (data) => async(dispatch) => {
    // console.log("checked")
    // console.log(data)
    const {previewImage} = data
    console.log("previewImage at thunk", previewImage)
    const response = await csrfFetch(`/api/spots/${data.spot.id}`, {
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });

   
    const updatedSpot = await response.json();
    console.log("updatedSpot on thunk", updatedSpot)
    updatedSpot.previewImage = previewImage
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
            console.log("newState", newState)
            
            return newState; 
        case LOAD_CURRENT_SPOTS:
            newState = Object.assign({},state);
            action.payload.forEach((element) =>{
                newState[element.id] = element
            })
            // newState = action.payload
            console.log("newState", newState)
            
            return newState;
                            // newState = {...state};
                            // action.payload.forEach((element) =>{
                            //     newState[element.id] = element
                            // })
                            // // newState = action.payload
                            // // console.log("newState", newState)
                            
                            // return {
                            //     ...newState
                            // }; 
        case ADD_ONE_SPOT:
            console.log('action',action)
            console.log('state',state)
                newState = {
                    ...state,
                    [action.spot.id]:action.spot,
                    // [action.spot.id.previewImage]:action.newImage.url
                };
                console.log("newState",newState)
            
            return newState
            // newState = {...state}
            // newState.allSpots[action.spot.id] = action.spot
            // newState[action.payload.spot.id] = action.payload.spot;
            // action.payload.spot.previewImage = action.payload.newImage.url
            // return newState;
        case UPDATE_SPOT:
            console.log("old state",state)
            newState= structuredClone(state)
            console.log("update part new state",newState)
            newState[action.payload.id] = action.payload
            return newState

        case REMOVE_SPOT:
            console.log("state before create newstate",state)
            newState = {...state};
            console.log("newState at remove spot",newState)
            console.log("that spot", newState[action.spotId])
            delete newState[action.spotId];
            
            return newState;
        default:
            return state
    }
}






export default spotsReducer