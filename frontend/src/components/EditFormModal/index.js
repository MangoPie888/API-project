import React,{useState} from "react";
import {useDispatch} from 'react-redux';
import { editSpot } from "../../store/spots";

import "./index.css"





function EditFormModal(props){
    console.log(1)
    const {closeModal, spot} = props
    // console.log(spot)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)


    const dispatch = useDispatch()
    console.log(2)
const handleSubmition=(e)=>{
    console.log('checked')
    return dispatch(editSpot({address,city,state,country,lat,lng,name,description,price,spot}))

}
    
    return (
        <>
        {console.log(3)}
        <form className="edit-form" onSubmit={handleSubmition}>
        <div>
        <label>address</label>
        <input type="text" className="edit-input" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder={address}></input>
        
        </div>
        <div>
        <label>city </label>
        <input type="text" className="edit-input" placeholder="city" value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder={city}></input>
       
        </div>
        <div>
        <label>state</label>
        <input type="text" className="edit-input" placeholder="state" value={state} onChange={(e)=>{setState(e.target.value)}} placeholder={state} ></input>
        
        </div>
        <div>
        <label>country</label>
        <input type="text" className="edit-input" placeholder="country" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder={country}></input>
        
        </div>
    
        {/* <input type="text" value={lat} onChange={(e)=>{setLat(e.target.value)}} placeholder={lat}></input>
        </label>
        <label>lng
        <input type="text" value={lng} onChange={(e)=>{setLng(e.target.value)}} placeholder={lng}></input> */}
        <div>
        <label>name</label>
        <input type="text" className="edit-input" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder={name}></input>
        
        </div>
        <div>
        <label>description</label>
        <input type="text" className="edit-input" placeholder="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={description}></input>
        
        </div>
        <div>
        <label>price </label>
        <input type="text" className="edit-input" placeholder="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder={price}></input>
       
        </div>
        <div className="cancel-submit-button">
        <div  >
        <button  className="cancel-button" onClick={()=>{closeModal(false)}}>Cancel</button>
        </div>
        <div >
        <button className="submit-button" type="submit">Submit</button>
        </div>
        </div>
        </form>
        </>
    )
};


export default EditFormModal;