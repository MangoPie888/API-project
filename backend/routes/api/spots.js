const express = require('express');
// const sequelize = require('sequelize')
const {Spot, SpotImage, Review, Sequelize, sequelize} = require('../../db/models');

const router = express.Router();

//Get all spots
router.get('/', async(req,res,next) =>{
    const spots = await Spot.findAll({
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
});





module.exports = router;