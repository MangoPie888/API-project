import React,{useEffect, useState} from "react";
import {useDispatch} from 'react-redux'
import * as spotActions from '../../store/spots'
import {useHistory} from 'react-router-dom';




import './index.css'


function CreateNewSpot({setShowModal}){
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [preview, setPreview] = useState(true)

    
    const dispatch = useDispatch()
    const history = useHistory()
const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(spotActions.createNewSpot({address,city,state,country,name,description,price,url,preview}))
    // history.push('/current')
    // window.location.reload
    setShowModal(false)
    

}


    return (
        <form id="first" onSubmit={handleSubmit} >
        <input className="create-house-input" type="text" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required></input>
      
        <input className="create-house-input" type="text" placeholder="city" value={city} onChange={(e)=>{setCity(e.target.value)}} required ></input>
      
      
        <input  className="create-house-input" type="text" placeholder="state" value={state} onChange={(e)=>{setState(e.target.value)}} required></input>
        
     
        <input className="create-house-input" type="text" placeholder="country" value={country} onChange={(e)=>{setCountry(e.target.value)}} required></input>
      
       
        {/* <input className="create-house-input" type="text" placeholder="lat" value={lat} onChange={(e)=>{setLat(e.target.value)}} required></input>
     
        
        <input className="create-house-input" type="text" placeholder="lng" value={lng} onChange={(e)=>{setLng(e.target.value)}} required></input>
      */}
       
        <input className="create-house-input" type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}}required ></input>
        
   
        <input className="create-house-input" type="text" placeholder="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} ></input>
       
      
        <input className="create-house-input" type="text" placeholder="price" pattern='[0-9]+(\\.[0-9][0-9]?)?' value={price} onChange={(e)=>{setPrice(e.target.value)}} ></input>
     
        <input className="create-house-input" type='url'  placeholder="image url" value={url} onChange={(e)=>{
               console.log('e',e.target.value);
        setUrl(e.target.value)}}></input>
     <div>
        {/* <button className="modal-button" onClick={()=>{setShowModal(false)}} >Cancel</button> */}
        <button className="modal-button" type="submit" >Create</button>
    </div>
        </form>
    )
};


export default CreateNewSpot;