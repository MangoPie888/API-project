
import './Card.css';
import {Link} from 'react-router-dom';


function Card({spot}){



    return(
            <div className='card-div'>
            <Link to ={`/${spot.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
            {/* <div className="container" > */}
            <img src={spot.previewImage} alt="house photo" />
        
            <div className="info">
            <p>{spot.city},{spot.state}</p>
            {spot.avgRating && <p><span>&#9733;</span> {Number(spot.avgRating).toFixed(1)}</p>}
            {!spot.avgRating && <p><span>&#9733;</span>New</p>}
           
            </div>
            <div className="price"  key={spot.name}>
                <p>${spot.price} night</p>
            </div>
            {/* </div> */}
            </Link>
            </div>




    )}



export default Card;