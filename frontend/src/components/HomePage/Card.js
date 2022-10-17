import HomePage from ".";
import './Card.css';
import {Link} from 'react-router-dom';


function Card({allSpots}){
    // const allSpot = useSelector(state=>(state.spots))
    // console.log(allSpots)
    const objArr = Object.values(allSpots)
    // console.log("objArr",objArr)
    
    // objArr.map((spot)=>{console.log(spot.id)})


    if(allSpots){
    return(
        <>
        {objArr.map((spot=>(
            <Link to ={`/spots/${spot.id}`}>
            <div className="container" key={spot.id}>
            <div className="photo">
            <img src={spot.previewImage} alt="house photo" />
            </div>
            <div className="info">
            <h5>{spot.name}</h5>
            <p>${spot.price} night</p>
            </div>
            <div className="rating">
                <p>⭐ {spot.avgRating}</p>
            </div>
            </div>
            </Link>
        )))}
        </>




    )}
    else return null;
}



export default Card;