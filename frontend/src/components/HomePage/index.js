import React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import * as spotActions from '../../store/spots'
import Card from './Card';




function HomePage(){
    const allSpots = useSelector(state=>(state.spots))
    console.log(allSpots)

    const dispatch = useDispatch()

useEffect(()=>{
    dispatch(spotActions.displaySpot())
},[])



    return(
        <div>
        <Card allSpots={allSpots}/>
        </div>


    )
}



export default HomePage;