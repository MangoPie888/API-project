const express = require('express');
// const sequelize = require('sequelize')
const {Spot, SpotImage, Review, Sequelize, sequelize} = require('../../db/models');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');

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


module.exports = router;