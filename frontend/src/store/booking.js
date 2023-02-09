import { csrfFetch } from './csrf';






//thunk
//booking a spot
export const reserveSpot = (info)=> async(dispatch) =>{
    const {spotId} = info
    console.log("spotId from thunk",spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method:'post',
        hearders:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(info)
    });

    const resevation = await response.json()
    console.log("resevation",resevation)
}