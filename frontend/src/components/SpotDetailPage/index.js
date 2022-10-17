import React from "react";
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';


function SpotDetailPage(){
    const {spotId} = useParams();
    

    const allSpots = useSelector(state=>(state.spots))
    console.log(allSpots)
    const singleSpot = allSpots[spotId];
    console.log(singleSpot)




    return (
        <div>
        <div>
            <h1>{singleSpot.name}</h1>
            <p>{singleSpot.avgRating}</p>
            <p>house descriptin</p>
        </div>
        <div>
        <p>reviews</p>
        </div>
        </div>
    )
};


export default SpotDetailPage;