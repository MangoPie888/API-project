
import './Card.css';
import {Link} from 'react-router-dom';


function Card({spot}){



    return(
            <Link to ={`/${spot.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
            {/* <div className="container" > */}
            <img src={spot.previewImage} alt="house photo" />
        
            <div className="info">
            <h3>{spot.name}</h3>
            <p>${spot.price} night</p>
            </div>
            <div className="rating"  key={spot.name}>
                <p>⭐ {spot.avgRating}</p>
            </div>
            {/* </div> */}
            </Link>




    )}



export default Card;