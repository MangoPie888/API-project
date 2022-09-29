const express = require('express');
const {User,Spot, SpotImage, Review, ReviewImage,Booking,Sequelize, sequelize} = require('../../db/models');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { json } = require('sequelize');

const router = express.Router();


//Get all of the Current User's Bookings  还没有完成
router.get('/current', restoreUser,requireAuth, async(req,res)=>{
    const {user} = req;
    if(user) {
        const bookings = await Booking.findAll({
            where:{userId:user.id},
            include:{
                model:Spot
            }
        
        });

        res.json(bookings)
    }

});



//Edit a Booking
function dateValidation(req,res,next) {
    const {startDate, endDate} = req.body;
    if(Date.parse(startDate) >= Date.parse(endDate)) {
    res.status(403);
    res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
        "endDate": "endDate cannot be on or before startDate"
        }
    })
    }else{next()}   
};

router.put('/:bookingId', restoreUser,requireAuth,dateValidation, async(req,res)=>{
    const booking = await Booking.findByPk(req.params.bookingId);
    if(!booking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    };


    const currentDate = new Date()
    if(Date.parse(booking.startDate) <= Date.parse(currentDate)){
        res.status(403);
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    };

    const {startDate,endDate} = req.body;
    if(Date.parse(booking.startDate) === Date.parse(startDate )|| Date.parse(booking.endDate) === Date.parse(endDate)) {
        res.status(403);
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
            }
        })
    };


    const {user} = req;
    if(user) {
        if(user.id === booking.userId) {
            booking.update({startDate,endDate});
            res.json(booking)    
        }else{
            res.status(403)
            res.json({
            "message":'Forbidden',
            "statusCode":403
        })}
    }

});









module.exports = router;