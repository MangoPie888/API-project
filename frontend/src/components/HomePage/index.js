import React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import * as spotActions from '../../store/spots'
import Card from './Card';
import './index.css'




function HomePage(){
    const allSpots = useSelector(state=>(state.allSpots)) /*|| []*/
    // console.log(allSpots)
    const spotsArray = Object.values(allSpots)
    // console.log(spotsArray)

    const dispatch = useDispatch()

useEffect(()=>{
    dispatch(spotActions.displaySpot())
},[])



    return(
        <div className='content-container'>
        {!!Object.keys(allSpots).length && spotsArray.map(spot => <Card key={spot.id} spot={spot} />)}
        </div>

    )
}



export default HomePage;