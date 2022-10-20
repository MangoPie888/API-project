import React,{useState} from "react";
import {useDispatch} from 'react-redux';
import { editSpot } from "../../store/spots";





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
        <form onSubmit={handleSubmition}>
        <label>address
        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder={address}></input>
        </label>
        <label>city
        <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder={city}></input>
        </label>
        <label>state
        <input type="text" value={state} onChange={(e)=>{setState(e.target.value)}} placeholder={state} ></input>
        </label>
        <label>country
        <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder={country}></input>
        </label>
        <label>lat
        <input type="text" value={lat} onChange={(e)=>{setLat(e.target.value)}} placeholder={lat}></input>
        </label>
        <label>lng
        <input type="text" value={lng} onChange={(e)=>{setLng(e.target.value)}} placeholder={lng}></input>
        </label>
        <label>name
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder={name}></input>
        </label>
        <label>description
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={description}></input>
        </label>
        <label>price
        <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder={price}></input>
        </label>
        <button onClick={()=>{closeModal(false)}}>Cancel</button>
        <button type="submit">Submit</button>
        </form>
        </>
    )
};


export default EditFormModal;