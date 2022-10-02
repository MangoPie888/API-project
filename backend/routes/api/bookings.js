const express = require('express');
const {User,Spot, SpotImage, Review, ReviewImage,Booking,Sequelize, sequelize} = require('../../db/models');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { json } = require('sequelize');

const router = express.Router();


//Get all of the Current User's Bookings  
router.get('/current', restoreUser,requireAuth, async(req,res)=>{
    const {user} = req;
    if(user) {
        let bookings = await Booking.findAll({
            where:{userId:user.id},
            include:{
                model:Spot,
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
            }
        
        });

    for (let booking of bookings) {
        const img = await SpotImage.findOne({
            where:{spotId:booking.Spot.id,preview:true}
        });
        if(img) {
            booking.dataValues.Spot.dataValues.previewImage = img.url
        }else{
            booking.dataValues.Spot.dataValues.previewImage ='No available preview images.'
        }
    }

        res.json({Bookings:bookings})
    }else{
        return (
            res.status(401),
            res.json({
                "message": "Authentication required",
                "statusCode": 401
        }))
    }

});



//Edit a Booking
function dateIsValid(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateStr.match(regex) === null) {
    return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
    }

    return date.toISOString().startsWith(dateStr);
}

function dateValidation(req,res,next) {
    const {startDate, endDate} = req.body;
    if(!startDate) {
        return (
            res.status(400),
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                "startDate": "startDate is required"
            }
            }))
    };
    if(!endDate) {
        return (
            res.status(400),
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                "endDate": "endDate is required"
            }
            }))

    };

    if(dateIsValid(startDate)===false || dateIsValid(endDate)=== false) {
        return (
            res.status(400),
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                "DateFormat": "Date must follow the correct format 'YYYY-MM-DD'"
            }
            }))
    };

    if(Date.parse(startDate) >= Date.parse(endDate)) {
        return (res.status(400),
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot be on or before startDate"
        }
    }))
    }else{next()}   
};

router.put('/:bookingId', restoreUser,requireAuth,dateValidation, async(req,res)=>{
    const booking = await Booking.findByPk(req.params.bookingId);
    if(!booking) {
        return (
            res.status(404),
            res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
        }))
    };


    const currentDate = new Date()
    if(Date.parse(booking.startDate) <= Date.parse(currentDate)){
        return (
            res.status(403),
            res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
        }))
    };

    const {startDate,endDate} = req.body;
    if(Date.parse(booking.startDate) === Date.parse(startDate )|| Date.parse(booking.endDate) === Date.parse(endDate)) {
        return (
            res.status(403),
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        }))
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



//Delete a Booking

router.delete('/:bookingId',restoreUser,requireAuth,async(req,res)=>{
    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking) {
        return (
            res.status(404),
            res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
        }))
    };

    const currentDate = new Date();
    if(Date.parse(booking.startDate) <= Date.parse(currentDate)) {
        return (
            res.status(403),
            res.json({
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
        }))
    }

    const {user} = req;
    if(user) {
        if(booking.userId===user.id) {
            booking.destroy();
            return (
                res.json({
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
    }
    
});









module.exports = router;