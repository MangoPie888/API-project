const express = require('express');
// const sequelize = require('sequelize')
const {User,Spot, SpotImage, Review, ReviewImage,Booking,Sequelize, sequelize} = require('../../db/models');
const user = require('../../db/models/user');
const{setTokenCookie,requireAuth} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { json } = require('sequelize');



const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js')
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js')
const { restoreUser } = require('../../utils/auth.js');



router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots',spotsRouter);

router.use('/reviews',reviewsRouter);

router.use('/bookings',bookingsRouter);




router.post('/test',(req,res)=>{
    res.json({requestBody: req.body});
});


//Delete a Spot Image
router.delete('/spot-images/:imageId',restoreUser,requireAuth,async(req,res)=>{
    const images = await SpotImage.findByPk(req.params.imageId);
    if(!images) {
        return (
            res.status(404),
            res.json({
                "message": "Spot Image couldn't be found",
                "statusCode": 404
        }))
    };
    
    const spotId = images.spotId
    const spot = await Spot.findByPk(spotId);
    const{user} = req;
    if(user) {
        if(user.id === spot.ownerId) {
            images.destroy();
            return (res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            }))
        }else{
            return (
                res.status(403),
                res.json({
                    "message":'Forbidden',
                    "statusCode":403
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

} );


//Delete a Review Image
router.delete('/review-images/:imageId',restoreUser,requireAuth,async(req,res)=>{
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    if(!reviewImage) {
        return (
            res.status(404),
            res.json({
                "message": "Review Image couldn't be found",
                "statusCode": 404
        }))
    };

    const review = await Review.findOne({
        where:{id:reviewImage.reviewId}
    });
    const {user} = req;
    if(user) {
        if(user.id === review.userId) {
            reviewImage.destroy();
            return (res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            }))
        }else{
            return (
                res.status(403),
                res.json({
                    "message":'Forbidden',
                    "statusCode":403
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
} )



module.exports = router;