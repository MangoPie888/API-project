import {createStore, applyMiddlewarem, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const rootRuducer = combineReducers({

});

let enhancer;

if(process.env.NODE_ENV ==="production") {
    enhancer = applyMiddlewarem(thunk);
}else{
    const logger = require('redux-logger').default;
    const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
};



const configureStore = (preloadedState) =>{
    return createStore(rootRuducer, preloadedState, enhancer);
};


export default configureStore;