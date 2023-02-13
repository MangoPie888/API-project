import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditBooking = (props) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState() 

  const data = (props.startDate).split(",")
    console.log("split",data)
  setStartDate(new Date(data[0].substring(0,10)) )
  console.log("startDate",startDate)
  console.log("data[1]",data[1])
  setEndDate(new Date(data[1].substring(0,10)))
  console.log("enddate",endDate)
  return (
    <div>
      <p>This is EditBooking page</p>
      {/* <label>CHECK-IN
      <DatePicker 
        showIcon
        selected={startDate}
        onChange={(date)=>setStartDate(date)}
      />
      </label> */}
{/* 
      <label>CHECKOUT
      <DatePicker 
        showIcon
        selected={endDate}
        onChange={(date)=>{setEndDate(date)}}
      />
      </label> */}
    </div>
  )
}

export default EditBooking
