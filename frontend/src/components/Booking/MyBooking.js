import React from 'react'
import { useEffect } from 'react'
import { showBooking } from '../../store/booking'
import { useSelector, useDispatch } from 'react-redux';
import { deleteBooking } from '../../store/booking';


const MyBooking = () => {
    const disptach = useDispatch()

    useEffect(()=>{
        disptach(showBooking())
    },[disptach])

    const allBookings = useSelector(state=>state.userBookings)
    console.log("allBookings",allBookings)
    const bookingArray = Object.values(allBookings)
    console.log("bookingArray", bookingArray)
    let upcoming;
    let passedTrip;
    if(bookingArray){
        upcoming = bookingArray.filter((booking)=>{
            return Date.parse(booking.startDate) > Date.parse(new Date())
        })
        passedTrip = bookingArray.filter((booking)=>{
            return Date.parse(booking.startDate) <= Date.parse(new Date())
        })

    }
    console.log("upcoming",upcoming)
    console.log("passedTrip",passedTrip)

    const handleDelete=(e)=>{
        const bookingId = e.target.id
        console.log("bookingid",bookingId)
        disptach(deleteBooking(bookingId))
    }

    const handleEditBooking=()=>{

    }

  return (
    <>
        <h3>Upcoming trips</h3>
        {bookingArray && upcoming.map((booking)=>{
            return(
            <div className='trip-main-container'>

                <div className='name-state-div'>
                    <h3>{booking.Spot.name}</h3>
                    <p>{booking.Spot.city} {booking.Spot.state}</p>
                </div>
                
                <div className='booingDate-function-div'>
                    <div className='booking-date-div'>
                        <div className='left-title'>
                            <p>startDate</p>
                            <p>endDate</p>
                            <p>Sport.price</p>
                            <p>Total fee</p>
                        </div>

                        <div className='right-infor'>
                            <p>{booking.startDate}</p>
                            <p>{booking.endDate}</p>
                            <p>{booking.Spot.price}</p>
                            <p>Total fee</p>
                        </div>
                    </div>

                    <div className='edit-delete-div'>
                        <button id={booking.id} onClick={handleEditBooking}>Update Trip</button>
                        <button id={booking.id} onClick={handleDelete}>Cancel Trip</button>
                    </div>

                </div>

                <div className='booking-image-div'>
                <img src={booking.Spot.previewImage}/>
                </div>

            </div>
            )
            
        }) }


        <h3>Current and passed trips</h3>
        {bookingArray && passedTrip.map((booking)=>{
            return(
            <div className='trip-main-container'>

                <div className='name-state-div'>
                    <h3>{booking.Spot.name}</h3>
                    <p>{booking.Spot.city} {booking.Spot.state}</p>
                </div>
                
                <div className='booingDate-function-div'>
                    <div className='booking-date-div'>
                        <div className='left-title'>
                            <p>startDate</p>
                            <p>endDate</p>
                            <p>Sport.price</p>
                            <p>Total fee</p>
                        </div>

                        <div className='right-infor'>
                            <p>{booking.startDate}</p>
                            <p>{booking.endDate}</p>
                            <p>{booking.Spot.price}</p>
                            <p>Total fee</p>
                        </div>
                    </div>

                    {/* <div className='edit-delete-div'>
                        <button>Update Trip</button>
                        <button>Cancel Trip</button>
                    </div> */}

                </div>

                <div className='booking-image-div'>
                <img src={booking.Spot.previewImage}/>
                </div>

            </div>
            )
            
        }) }
    </>
  )
}

export default MyBooking
