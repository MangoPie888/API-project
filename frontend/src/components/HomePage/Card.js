import HomePage from ".";
import './Card.css';


function Card({allSpots}){
    // const allSpot = useSelector(state=>(state.spots))
    console.log(allSpots)
    const objArr = Object.values(allSpots)
    console.log("objArr",objArr)

    if(allSpots){
    return(
        <>
        {objArr.map((spot=>(
            <>
            <div className="container">
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
            </>
        )))}
        </>




    )}
    else return null;
}



export default Card;