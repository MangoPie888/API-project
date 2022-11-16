import React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import * as spotActions from '../../store/spots'
import Card from './Card';
import './index.css'




function HomePage(){
    const allSpots = useSelector(state=>(state.allSpots)) /*|| []*/

    const spotsArray = Object.values(allSpots)


    const dispatch = useDispatch()

useEffect(()=>{
    dispatch(spotActions.displaySpot())
},[])



    return(
        <>
        <div className='content-container'>
        {!!Object.keys(allSpots).length && spotsArray.map(spot => <Card key={spot.id} spot={spot} />)}
        </div>
        <footer>
            <p className='copyright'>© {new Date().getFullYear()}  aircnc, Inc.</p>
        </footer>
        </>

    )
}



export default HomePage;