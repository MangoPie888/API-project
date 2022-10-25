
import './Card.css';
import {Link} from 'react-router-dom';


function Card({spot}){
    // const allSpot = useSelector(state=>(state.spots))
    // console.log(allSpots)
    // const objArr = Object.values(allSpots)
    // console.log("objArr",objArr)
    
    // objArr.map((spot)=>{console.log(spot.id)})

    // console.log('setClicked:', allSpots);


    return(
            <div className="container" >
            <Link to ={`/${spot.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
            <div className="photo">
            <img src={spot.previewImage} alt="house photo" />
            </div>
            <div className="info">
            <h3>{spot.name}</h3>
            <p>${spot.price} night</p>
            </div>
            <div className="rating"  key={spot.name}>
                <p>⭐ {spot.avgRating}</p>
            </div>
            </Link>
            </div>




    )}



export default Card;