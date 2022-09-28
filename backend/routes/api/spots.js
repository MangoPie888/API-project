const express = require('express');
const sequelize = require('sequelize')
const {Spot, SpotImage, Review} = require('../../db/models');

const router = express.Router();

router.get('/', async(req,res,next) =>{
    let spots = await Spot.findAll();
 
    // for(let i = 0; i <spots.length; i++) {
    //     let spot = spots[i];
    //   let review = await Spot.findAll({
    //         include:[{
    //             model:Review
    //         }],
    //         where:{id:spot.id}
    //     })
    




    




    res.json({
        Spots:spots
    })
})





module.exports = router;