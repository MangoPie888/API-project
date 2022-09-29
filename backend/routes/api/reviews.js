const express = require('express');
const {User,Spot, SpotImage, Review,ReviewImage, Sequelize, sequelize} = require('../../db/models');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

});



//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', restoreUser,requireAuth,async(req,res)=>{
    const {user} = req;
    if(user) {
        const review = await Review.findByPk(req.params.reviewId);
        if(review) {
            const reviewImages = await ReviewImage.findAll({
                where:{reviewId:req.params.reviewId}
            });
            if(reviewImages.length >= 10) {
                res.status(403);
                res.json({
                    "message": "Maximum number of images for this resource was reached",
                    "statusCode": 403
                })
            };
            const reviewId = req.params.reviewId;
            const {url} = req.body
            const newImage = await ReviewImage.create({reviewId,url})
            let body = {
                id:newImage.id,
                url:newImage.url  
            };
            res.json(body)
        }else{
            res.status(404);
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
        };

    }

});



//Edit a Review
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
router.put('/:reviewId',restoreUser,requireAuth,reviewValidation,async(req,res)=>{
    const {user} = req;
    if(user) {
        const reviews= await Review.findByPk(req.params.reviewId);
        if(!reviews) {
            res.status(404);
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
            });
        }
        if(reviews.userId === user.id) {
            const{review,stars} = req.body
            reviews.update({review,stars});
            res.json(reviews)
        }
    } 
} )







module.exports = router;