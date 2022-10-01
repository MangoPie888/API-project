const express = require('express');
// const sequelize = require('sequelize')
const {User,Spot, SpotImage, Review, ReviewImage,Booking,Sequelize, sequelize} = require('../../db/models');
const user = require('../../db/models/user');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { json } = require('sequelize');
const {Op} = require('sequelize')


const router = express.Router();


//Get all spots
//Add Query Filters to Get All Spots
const queryValidation = [
    check('page')
    .optional()
    .isInt({min:1,max:10})
    .withMessage("Page must be greater than or equal to 1"),
    check('size')
    .optional()
    .isInt({min:1, max:20})
    .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
    .optional()
    .isDecimal()
    // .isLatLong()
    .withMessage("Minimum latitude is invalid"),
    check('maxLat')
    .optional()
    .isDecimal()
    // .isLatLong()
    .withMessage( "Maximum latitude is invalid"),
    check('minLng')
    .optional()
    .isDecimal()
    // .isLatLong()
    .withMessage("Minimum longitude is invalid"),
    check('maxLng')
    .optional()
    .isDecimal()
    // .isLatLong()
    .withMessage("Maximum longitude is invalid"),
    check('minPrice')
    .optional()
    .isFloat({min:0})
    .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
    .optional()
    .isFloat({min:0})
    .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
];

router.get('/', queryValidation, async(req,res,next) =>{
    let query = {
        where:{},
        include:[]
    }
    let {page,size, minLat,maxLat,minLng,maxLng,minPrice,maxPrice} = req.query;
    page === undefined ? 1 : parseInt(req.query.page);
    size === undefined ? 20 : parseInt(req.query.size);
    if(page >= 1 && size >=1) {
        query.limit = size,
        query.offset = size * (page - 1);
    };

    if(minLat) {query.where.lat = {[Op.gte]:minLat}};
    if(maxLat) {query.where.lat = {[Op.lte]:maxLat}};
    if(minLng) {query.where.lng = {[Op.gte]:minLng}};
    if(maxLng) {query.where.lng = {[Op.lte]:maxLng}};
    if(minPrice) {query.where.price = {[Op.gte]:minPrice}};
    if(maxPrice) {query.where.price = {[Op.lte]:maxPrice}};


    const spots = await Spot.findAll(query);
    spots.page = page;
    spots.size = size;

    const Spots = [];

    for(let spot of spots) {
        const average = await Review.findAll({
            where:{spotId:spot.id},
            attributes:[
                [
                    sequelize.fn("AVG", sequelize.col('stars')), 
                    "avgRating"
                ]
            ],
            raw:true
        });

        let previewImage = null;
        
        const image = await SpotImage.findOne({
            where:{spotId:spot.id, preview:true},
            attributes:['url']
        });

        if(image){
            previewImage=image.url
        }

        const spotsBody = {
            id:spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city:spot.city,
            state:spot.state,
            country:spot.country,
            lat:spot.lat,
            lng:spot.lng,
            name:spot.name,
            description:spot.description,
            price:spot.price,
            createdAt:spot.createdAt,
            updatedAt:spot.updatedAt,
            aveRating:average[0].avgRating,
            previewImage,
        };
        Spots.push(spotsBody);

    
    };

    res.json({
    Spots,
    page:parseInt(page),
    size:parseInt(size)
    })
});


//Get all Spots owned by the Current User
router.get('/current', restoreUser,requireAuth,async(req,res,next) =>{
    const {user} = req;
    if(user) {
        const spots = await Spot.findAll({
            where:{ownerId:user.id},

        });

        let previewImage = null;
        const Spots = [];
    
        for(let spot of spots) {
            const spotImage = await SpotImage.findOne({
                where:{spotId:spot.id}
            });

            if(spotImage) {
                previewImage = spotImage.url
            }
        
            const average = await Review.findAll({
                where:{spotId:spot.id},
                attributes:[
                    [
                        sequelize.fn("AVG", sequelize.col('stars')), 
                        "avgRating"
                    ]
                ],
                raw:true
            });
    
            const spotsBody = {
                id:spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city:spot.city,
                state:spot.state,
                country:spot.country,
                lat:spot.lat,
                lng:spot.lng,
                name:spot.name,
                description:spot.description,
                price:spot.price,
                createdAt:spot.createdAt,
                updatedAt:spot.updatedAt,
                aveRating:average[0].avgRating,
                previewImage
            };
            Spots.push(spotsBody)
        };
    
        res.json({
        Spots
        })

    }else{ res.status(401)
        res.json({
        "message": "Authentication required",
        "statusCode": 401
    })}


});


//Get details of a Spot from an id (how to rename the "User" table?reviews[0].avgRating)
router.get('/:spotId', async (req, res)=>{
    let spot = await Spot.findOne({
        where:{id:req.params.spotId},
        include:[
            {
                model:SpotImage,
                attributes:{
                    exclude:['createdAt','updatedAt','spotId']
                }
            },
            {
                model:User, as: 'Owner',
                attributes:{
                    exclude:['username','hashedPassword','email','createdAt','updatedAt']
                }

            }
        ]
    }
        );

    if(!spot) {
        return (res.status(404),
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        ))
    };

    
    const reviews = await Review.findAll({
        where:{spotId:spot.id},
            attributes:[
                [
                    sequelize.fn("AVG", sequelize.col('stars')), 
                    "avgRating"
                ],
                [
                    sequelize.fn("COUNT", sequelize.col('id')),
                    "numReviews"
                ]
            ],
                raw:true
            });
    spot.dataValues.numReviews = reviews[0].numReviews;
    spot.dataValues.avgStarRating = reviews[0].avgRating;

    res.json(spot)




});


//Create a Spot
const validationCheck = [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage( "State is required"),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
    check('lat')
    .exists({ checkFalsy: true })
    .isDecimal({})
    .withMessage("Latitude is not valid"),
    check('lng')
    .exists({ checkFalsy: true })
    .isDecimal({})
    .withMessage("Longitude is not valid"),
    check('name')
    .exists({ checkFalsy: true })
    .isLength({max:50})
    .withMessage("Name must be less than 50 characters"),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
    check('price')
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
    handleValidationErrors
];


router.post('/', restoreUser,requireAuth,validationCheck, async (req, res)=>{
    const {user} = req;
    if(user){
        const {address,city,state,country,lat,lng,name,description,price} = req.body;
        const ownerId = user.id
        const newSpot = await Spot.create({ownerId,address,city,state,country,lat,lng,name,description,price});

        res.status(201),
        res.json(newSpot)
    }else {
        res.status(401),
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
    }

});



//Add an Image to a Spot based on the Spot's id

router.post('/:spotId/images',restoreUser,requireAuth, async (req,res)=>{
    const{user} = req;
    if(user) {
        const spot = await Spot.findByPk(req.params.spotId);
        if(!spot) {
            res.status(404);
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
        else if(spot.ownerId === user.id) {
            const{url, preview} = req.body;
            const spotId = req.params.spotId
            const newImage = await SpotImage.create({spotId,url,preview});
            return res.json({
                id:newImage.id,
                url:newImage.url,
                preview:newImage.preview,
            })
        }else{
            res.status(403)
            res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }
    }else return res.json(
        res.status(401),
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
    );
});


//Edit a Spot
router.put('/:spotId', restoreUser,requireAuth, async(req,res)=>{
    const{user} = req;
    if(user) {
        const spot = await Spot.findByPk(req.params.spotId);
        if(!spot) {
            res.status(404);
            return res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
        if(spot.ownerId === user.id) {
            const{address,city,state,country,lat,lng,name,description,price} = req.body;
            spot.update({address,city,state,country,lat,lng,name,description,price});
            return res.json(spot)
        }else{
            res.status(403),
            res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }
    }else {
        res.status(401);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
    }

});


//Delete a spot
router.delete('/:spotId',restoreUser,requireAuth,async(req,res)=>{
    const{user} = req;
    if(user) {
        const spot = await Spot.findByPk(req.params.spotId);
        if(!spot) {
            return (
                res.status(404),
                res.json({
                    "message": "Spot couldn't be found",
                    "statusCode": 404
            }))
        }
        if(spot.ownerId === user.id){
            spot.destroy();
            return res.json(
                {
                    "message": "Successfully deleted",
                    "statusCode": 200
                }
            )
        }else{
            return (
                res.status(403),
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
            }))
        }

    }else{
        return ( 
            res.status(401),
            res.json({
                "message": "Authentication required",
                "statusCode": 401
        }))
    }

});



//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req,res)=>{
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) {
        return ( res.status(404),
                res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        }))
    };
    const Reviews = await Review.findAll({
        where:{spotId:req.params.spotId},
        include:[
            {
                model:User,
                attributes:{
                    exclude:['username','hashedPassword','email','createdAt','updatedAt']
                }
            


            },
            {
                model:ReviewImage,
                attributes:{
                    exclude:['reviewId','createdAt','updatedAt']
                }
                
            },
        ]
    });


    let body = {Reviews};
    

    res.json(body)
})




//Create a Review for a Spot based on the Spot's id
const reviewValidation= [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
    check('stars')
    .exists({ checkFalsy: true })
    .isInt({min:1, max:5})
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
router.post('/:spotId/reviews',restoreUser,requireAuth,reviewValidation,async(req,res)=>{
    const {user} = req;
    if(user) {
        const spot = await Spot.findByPk(req.params.spotId);
        if(spot) {
            const reviews = await Review.findAll({
                where:{spotId:req.params.spotId}
            });

            for(let review of reviews) {
                if(review.userId === user.id) {
                return ( 
                    res.status(403),
                    res.json({
                        "message": "User already has a review for this spot",
                        "statusCode": 403
                    }))
                }
            };
            

                const {review,stars} = req.body;
                const userId = user.id;
                const spotId = req.params.spotId
                const newReview = await Review.create({userId,spotId,review,stars});
                res.status(201);
                res.json(newReview)
        }else{
            res.status(404);
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
        
    }else{
        res.status(401);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
    }

});


//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", restoreUser,requireAuth, async(req,res)=>{
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }else{
        const {user} = req;
        if(user) {
            if(spot.ownerId === user.id) {
                const bookings = await Booking.findAll({
                    where:{spotId: req.params.spotId},
                    include:{
                        model:User,
                        attributes:{
                            exclude:['username','hashedPassword','email','createdAt','updatedAt']
                        }
                    }

                });

                res.json({Bookings:bookings})
            } else{
                const bookings = await Booking.findAll({
                    where:{spotId:req.params.spotId},
                    attributes:{
                        exclude:['id','userId','createdAt','updatedAt']
                    }
                });
                res.json({Bookings:bookings})

            }

        }else{
            res.status(401),
            res.json({
                "message": "Authentication required",
                "statusCode": 401
            })
        }
    }
});



//Create a Booking from a Spot based on the Spot's id
function dateValidation(req,res,next) {
    const {startDate, endDate} = req.body;
    if(Date.parse(startDate) >= Date.parse(endDate)) {
    return (
        res.status(403),
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot be on or before startDate"
            }})
    )
    }else{next()}   
};

router.post('/:spotId/bookings', restoreUser,requireAuth,dateValidation,async (req,res)=>{
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot) {
        return (
            res.status(404),
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
        }))
    };

    const {startDate,endDate} = req.body;
    const bookings = await Booking.findAll({
        where:{spotId:req.params.spotId}
    });

    for(let booking of bookings) {
        if(Date.parse(booking.startDate) === Date.parse(startDate )|| Date.parse(booking.endDate) === Date.parse(endDate)) {
            return (res.status(403),
                res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                    }
            }))
        }
    };
    


    const {user} = req;
    if(user) {
        if(spot.ownerId !== user.id) {
            const spotId = req.params.spotId;
            const userId = user.id
            const newBooking = await Booking.create({spotId,userId,startDate,endDate});
            res.json(newBooking)
        }
    }else{
        return (
            res.status(401),
            res.json({
                "message": "Authentication required",
                "statusCode": 401
        }))
    }

} )





module.exports = router;