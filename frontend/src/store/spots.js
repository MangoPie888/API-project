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
  
    dispatch(loadSpot(data.Spots));
    return response
}

export const getSpotsOfCurrentUser=()=>async(dispatch)=>{
    const response = await csrfFetch('api/spots/current');
    const data = await response.json();

    dispatch(loadCurrentSpots(data.Spots))
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
 

    const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(info)
            }); 

    const newImage = await imageResponse.json();
  
    newSpot.previewImage = newImage.url
   
    dispatch(addOneSpot(newSpot,newImage));
    dispatch(getSpotsOfCurrentUser());
}



export const editSpot = (data) => async(dispatch) => {

    const {previewImage} = data
   
    const response = await csrfFetch(`/api/spots/${data.spot.id}`, {
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });

   
    const updatedSpot = await response.json();
   
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
       
            
            return newState; 
        case LOAD_CURRENT_SPOTS:
            newState = Object.assign({},state);
            action.payload.forEach((element) =>{
                newState[element.id] = element
            })
         
            
            return newState;

        case ADD_ONE_SPOT:
           
                newState = {
                    ...state,
                    [action.spot.id]:action.spot,
                    // [action.spot.id.previewImage]:action.newImage.url
                };
               
            
            return newState
            // newState = {...state}
            // newState.allSpots[action.spot.id] = action.spot
            // newState[action.payload.spot.id] = action.payload.spot;
            // action.payload.spot.previewImage = action.payload.newImage.url
            // return newState;
        case UPDATE_SPOT:
            
            newState= structuredClone(state)
          
            newState[action.payload.id] = action.payload
            return newState

        case REMOVE_SPOT:
           
            newState = {...state};
           
            delete newState[action.spotId];
            
            return newState;
        default:
            return state
    }
}






export default spotsReducer