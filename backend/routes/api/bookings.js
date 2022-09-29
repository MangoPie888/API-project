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

})









module.exports = router;