
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
            <Link to ={`/${spot.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
            <div className="container" key={spot.id}>
            <div className="photo"  key={spot.id}>
            <img src={spot.previewImage} alt="house photo" />
            </div>
            <div className="info">
            <h3>{spot.name}</h3>
            <p>${spot.price} night</p>
            </div>
            <div className="rating"  key={spot.name}>
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