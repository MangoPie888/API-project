import React,{useState} from "react";





function EditFormModal({closeModal}){
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')



    return (
        <form>
        <label>address
        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} ></input>
        </label>
        <label>city
        <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} ></input>
        </label>
        <label>state
        <input type="text" value={state} onChange={(e)=>{setState(e.target.value)}} ></input>
        </label>
        <label>country
        <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} ></input>
        </label>
        <label>lat
        <input type="text" value={lat} onChange={(e)=>{setLat(e.target.value)}} ></input>
        </label>
        <label>lng
        <input type="text" value={lng} onChange={(e)=>{setLng(e.target.value)}} ></input>
        </label>
        <label>name
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} ></input>
        </label>
        <label>description
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} ></input>
        </label>
        <label>price
        <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} ></input>
        </label>
        <button onClick={()=>{closeModal(false)}}>Cancel</button>
        <button>Submit</button>
        </form>
    )
};


export default EditFormModal;