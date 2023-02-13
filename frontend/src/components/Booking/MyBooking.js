import React, { useState } from 'react'
import { useEffect } from 'react'
import { showBooking } from '../../store/booking'
import { useSelector, useDispatch } from 'react-redux';
import { deleteBooking } from '../../store/booking';
import { Modal } from '../../context/Modal';
import EditBooking from './EditBooking';
import ReviewForm from '../SpotDetailPage/ReviewForm';
import { getCurrentUserReview } from '../../store/userReview';

import "./Mybooking.css"


const MyBooking = () => {
    const dispatch = useDispatch()

    const[openModal, setOpenModal] = useState(false)
    const[startDate, setStartDate] = useState("")
    const[endDate,setEndDate] = useState("") 
    const[bookingId, setBookingId] = useState()
    const [spotImg, setSpotImg]= useState()
    const [spotName,setSpotName] = useState()
    const [spotId, setSpotId] = useState()

    const [modalOn, setModalOn] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    

    console.log("spotImg",spotImg)
    console.log("spotName",spotName)
    
    console.log("openModal",openModal)


    useEffect(()=>{
        dispatch(showBooking())
        dispatch(getCurrentUserReview())
    },[dispatch])

    const allReviews = useSelector(state=>state.userReviews)
    console.log("allReviews",allReviews)
    const reviewArray = Object.values(allReviews)
    console.log("review array",reviewArray)
    const spotReviewId = []
    for(let i = 0; i < reviewArray.length; i++){
        console.log("spotIddddddddd",reviewArray[i].spotId)
        spotReviewId.push(reviewArray[i].spotId)
    }
    console.log("spotIdArray",spotReviewId)

    

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
        dispatch(deleteBooking(bookingId))
    }

    const handleEditBooking=(e)=>{
        console.log(1)
        setOpenModal(true)
        console.log("shwoModal",openModal)
        console.log("e",e)
        console.log("value",e.target.value)
        setBookingId(e.target.id)
        let arrayValue = (e.target.value).split()
        console.log("arrayValue",arrayValue)
        setStartDate(arrayValue[0])
        console.log("startDate",startDate)
        setEndDate(arrayValue[1])
        console.log("endDate",endDate)
        setSpotName(arrayValue[2])
        setSpotImg(arrayValue[3])
        
    }
      
  
    const reviewing=(e)=>{
        setSpotId(e.target.id)
        console.log("spotId",spotId)
        setModalOn(true)
    }

  return (
    <>
        <h3 className='trip-title'>Upcoming trips</h3>
        {bookingArray && upcoming.map((booking)=>{
            return(
            <div className='trip-main-container'>
        
                <div className='booingDate-function-div'>
                    <div className='booking-date-div'>
                        <div className='left-title'>
                            <p>CHECK-IN</p>
                            <p>CHECKOUT</p>
                            <p>price</p>
                            <p>Total days</p>
                            <p>Total fee</p>
                        </div>

                        <div className='right-infor'>
                            <p>{booking.startDate.substring(0,10)}</p>
                            <p>{booking.endDate.substring(0,10)}</p>
                            <p>{booking.Spot.price}</p>
                            <p>Total days</p>
                            <p>Total fee</p>
                        </div>
                    </div>

                    <div className='edit-delete-div'>
                        <button className='booking-update-btn' value={[booking.startDate, booking.endDate,booking.Spot.name, booking.Spot.previewImage
                        ]} id={booking.id} onClick={handleEditBooking}>Update Trip</button>
                        
                        {openModal && 
                        <Modal onClose={()=>{setOpenModal(false)}}>
                            <EditBooking bookingId = {bookingId} startDate ={startDate} endDate={endDate} spotImg={spotImg} spotName={spotName} />
                        </Modal>}
                        
                        <button className='bookink-delet-btn' id={booking.id} onClick={handleDelete}>Cancel Trip</button>
                    </div>

                </div>
              

                <div className='booking-image-div'>
                    <h5>{booking.Spot.name}</h5>
                    <p>{booking.Spot.city} {booking.Spot.state}</p>
                    <img src={booking.Spot.previewImage}/>
                </div>

            </div>
            )
            
        }) }


        <h3 className='trip-title'>Current and passed trips</h3>
        {bookingArray && passedTrip.map((booking)=>{
            return(
            <div className='trip-main-container'>
                
                <div className='booingDate-function-div'>
                    <div className='booking-date-div'>
                        <div className='left-title'>
                            <p>startDate</p>
                            <p>endDate</p>
                            <p>Sport.price</p>
                            <p>Total fee</p>
                        </div>

                        <div className='right-infor'>
                            <p>{booking.startDate.substring(0,10)}</p>
                            <p>{booking.endDate.substring(0,10)}</p>
                            <p>{booking.Spot.price}</p>
                            <p>Total fee</p>
                        </div>
                    </div>

                    <div className='booking-reivew-div'>
                    {spotReviewId.includes(booking.spotId) ? <p>Reviewed</p> : <button id={booking.spotId} className='booking-review-btn' onClick={reviewing}>Write a Review</button> }
                    
                    {modalOn &&
                    <Modal onClose={()=>setModalOn(false)}>
                        <ReviewForm spotId={spotId}/>
                    </Modal>
                    }
                    </div>      
                </div>

                <div className='booking-image-div'>
                    <h5>{booking.Spot.name}</h5>
                    <p>{booking.Spot.city} {booking.Spot.state}</p>
                    <img src={booking.Spot.previewImage}/>
                </div>
                
                
            </div>
            )
            
        }) }
    </>
  )
}

export default MyBooking
