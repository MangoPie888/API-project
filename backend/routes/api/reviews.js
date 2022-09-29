const express = require('express');
const {User,Spot, SpotImage, Review,ReviewImage, Sequelize, sequelize} = require('../../db/models');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');

const router = express.Router();


//Get all Reviews of the Current User

router.get('/current',restoreUser,async(req,res)=>{
    const{user} = req;
    if(user) {
        const reviews = await Review.findAll({
            where:{userId:user.id},
            include: [
                {
                    model:User,
                    attributes:{
                        exclude:['username','hashedPassword','email','createdAt','updatedAt']
                    }

                },
                {
                    model:Spot,
                    attributes:{
                        exclude:['createdAt','updatedAt','OwnerId','description']
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

        for(let spot of Spot) {
            const spotImage = await SpotImage.findAll({
                where:{spotId:spot.id}
            });
            
        }
        
        res.json({Reviews:reviews})
    }

})







module.exports = router;