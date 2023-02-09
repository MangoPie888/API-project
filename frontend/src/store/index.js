import {combineReducers, applyMiddleware, compose} from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';

import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './spotReviews'
import singleSpotReducer from './singleSpot';
import userReviewsReducer from './userReview';
import bookingReducer from './booking';


const rootReducer = combineReducers({
    session: sessionReducer,
    allSpots: spotsReducer,
    singleSpot:singleSpotReducer,
    spotReviews:reviewsReducer,
    userReviews:userReviewsReducer,
    userBookings:bookingReducer,

});


let enhancer;

if(process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
}else{
    const logger = require('redux-logger').default;
    const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}


const configureStore = (preloadedState) =>{
    return createStore(rootReducer, preloadedState, enhancer);
};



export default configureStore;