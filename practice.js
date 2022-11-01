
let state = {
    allSpots:{},
    currentSpots:{},
    spotReviews: {
        1:{},
        2:{},
    }
}

let newState = Object.assign({},state);

console.log("spreadNewState", newState)

newState.spotReviews[3]= {1:"apple"}

console.log(newState)


