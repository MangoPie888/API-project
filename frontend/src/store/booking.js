import { ValidationError } from '../utils/validationError';
import { csrfFetch } from './csrf';


//action
const ALL_BOOKINGS = 'bookings/ALL_BOOKINGS'
const displayBooking = (data)=>{
    return {
        type:ALL_BOOKINGS,
        data
    }
        
}

const REMOVE_BOOKING = "bookings/REMOVE_BOOKING"
const removeBooking = (bookingId)=>{
    return({
        type:REMOVE_BOOKING,
        bookingId
    })
}


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

    if(!response.ok) {
        let error;
        if(response.status === 403) {
            error = await response.json()
            console.log('error',error)
            throw new ValidationError(error.message)
        }
    }

    const newBooking = await response.json()
    console.log("newBooking",newBooking)
    return newBooking
    
}


//dispaly all user's booking
export const showBooking =()=> async(dispatch)=>{
    const response = await csrfFetch('/api/bookings/current')
    
    const data = await response.json()
    console.log("data",data)
    dispatch(displayBooking(data.Bookings))
}

//edit 

//delete a booking
export const deleteBooking = (id)=>async(dispatch)=>{
    const response = await csrfFetch(`api/bookings/${id}`,{
        method:"delete",
    });
    dispatch(removeBooking(id))
    
}




//booking reducer
const intialState = {}

const bookingReducer = (state=intialState, action) =>{
    let newState;
    switch(action.type) {
        case ALL_BOOKINGS:
            newState = Object.assign({},state);
            action.data.forEach((element) =>{
                newState[element.id] = element
            })
            return newState; 
        
        case REMOVE_BOOKING:
            newState = {...state};
            delete newState[action.bookingId];
            return newState;

        default:
            return state}
        }

export default bookingReducer