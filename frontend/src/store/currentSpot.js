// import { csrfFetch } from './csrf';





// const LOAD_CURRENT_SPOTS = 'spots/LOAD_CURRENT_SPOTS'
// const loadCurrentSpots = (spot) =>{
//     return {
//         type:LOAD_CURRENT_SPOTS,
//         payload:spot
//     }
// }



// export const getSpotsOfCurrentUser=()=>async(dispatch)=>{
//     const response = await csrfFetch('api/spots/current');
//     const data = await response.json();
//     console.log(data.Spots)
//     dispatch(loadCurrentSpots(data.Spots))
// }


// const intialState = {};
// const currentSpotsReducer = (state=intialState, action) =>{
//     let newState;
//     switch(action.type) {
//         case LOAD_CURRENT_SPOTS:
//             newState = {};
//             action.payload.forEach((element) =>{
//                 newState[element.id] = element
//             })
//             // newState = action.payload
//             // console.log("newState", newState)
            
//             return {
//                 ...newState
//             }; 
//         default:
//             return state }
//         }
    
// export default currentSpotsReducer;