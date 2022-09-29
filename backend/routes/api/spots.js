const express = require('express');
// const sequelize = require('sequelize')
const {User,Spot, SpotImage, Review, ReviewImage,Booking,Sequelize, sequelize} = require('../../db/models');
const user = require('../../db/models/user');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { json } = require('sequelize');

const router = express.Router();

//Get all spots
router.get('/', async(req,res,next) =>{
    const spots = await Spot.findAll({
        // include:{
        //     model:SpotImage,
        //     where:{preview:true},
        //     attributes:['url']
        // },
    });
    // let previewImage
    // if(!SpotImage) {
    //     previewImage=null
    // }

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
            previewImage
        };
        Spots.push(spotsBody)
    };

    res.json({
    Spots
    })
});


//Get all Spots owned by the Current User
router.get('/current', restoreUser,requireAuth,async(req,res,next) =>{
    const {user} = req;
    if(user) {
        const spots = await Spot.findAll({
            where:{ownerId:user.id},
            include:{
                model:SpotImage,
                attributes:['url']
            }
        });
    
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
                previewImage:spot.SpotImages[0].url
            };
            Spots.push(spotsBody)
        };
    
        res.json({
        Spots
        })

    }else return res.json({})

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
        console.log(spot)
    
    if(!spot) {
        res.status(404),
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
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

        res.json(newSpot)
    }else return res.json({})

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
        if(spot.ownerId === user.id) {
            const{url, preview} = req.body;
            const spotId = req.params.spotId
            const newImage = await SpotImage.create({spotId,url,preview});
            res.json({
                id:newImage.id,
                url:newImage.url,
                preview:newImage.preview,
            })
        }
    }else return res.json({});
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
        }
    }else return res.json({});

});


//Delete a spot
router.delete('/:spotId',restoreUser,requireAuth,async(req,res)=>{
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
        if(spot.ownerId === user.id){
            spot.destroy();
            return res.json(
                {
                    "message": "Successfully deleted",
                    "statusCode": 200
                }
            )
        }

    }else return res.json({});

});



//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req,res)=>{
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
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
                    res.status(403);
                    res.json({
                        "message": "User already has a review for this spot",
                        "statusCode": 403
                    })
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

        }
    }
})





module.exports = router;