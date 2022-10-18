import React,{useEffect, useState} from "react";
import {useDispatch} from 'react-redux'
import * as spotActions from '../../store/spots'





function CreateNewSpot({ModalClose}){
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    
    const dispatch = useDispatch()
const handleSubmit = (e) => {
    // e.preventDefault();
    return dispatch(spotActions.createNewSpot({address,city,state,country,lat,lng,name,description,price}))

}

    return (
        <form onSubmit={handleSubmit} >
        <label>address
        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} required></input>
        </label>
        <label>city
        <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} required ></input>
        </label>
        <label>state
        <input type="text" value={state} onChange={(e)=>{setState(e.target.value)}} required></input>
        </label>
        <label>country
        <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} required></input>
        </label>
        <label>lat
        <input type="text" value={lat} onChange={(e)=>{setLat(e.target.value)}} required></input>
        </label>
        <label>lng
        <input type="text" value={lng} onChange={(e)=>{setLng(e.target.value)}} required></input>
        </label>
        <label>name
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}required ></input>
        </label>
        <label>description
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} ></input>
        </label>
        <label>price
        <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} ></input>
        </label>
        <button onClick={()=>{ModalClose(false)}} >Cancel</button>
        <button type="submit">Submit</button>
        </form>
    )
};


export default CreateNewSpot;