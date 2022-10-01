const express = require('express');
const {User,Spot, SpotImage, Review,ReviewImage, Sequelize, sequelize} = require('../../db/models');
const{setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');

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
                    },
                    include:{
                        model:SpotImage
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
        // console.log(reviews)

        let reviewList = [];
        reviews.forEach(review => {
            reviewList.push(review.toJSON())
        });
        // console.log("这是reviewList",reviewList)
        reviewList.forEach(review=>{
            review.Spot.SpotImages.forEach(img =>{
                if(img.preview === true && !review.Spot.previewImage) {
                    review.Spot.previewImage = img.url
                }
            });
            if(!review.Spot.previewImage) {
                review.Spot.previewImage = 'No available preview images.'
            }
            delete review.Spot.SpotImages
        });


        
        res.json({Review:reviewList})
    }else{
        res.status(401),
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
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
            return  (
                res.status(403),
                res.json({
                    "message": "Maximum number of images for this resource was reached",
                    "statusCode": 403
                }))
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
           return ( 
            res.status(404),
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
            }))
        }
        if(reviews.userId === user.id) {
            const{review,stars} = req.body
            reviews.update({review,stars});
            res.json(reviews)
        }else{
            res.status(403),
            res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }
    }else{
        res.status(401);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
    }
} );



//Delete a Review
router.delete('/:reviewId',restoreUser,requireAuth,async(req,res)=>{
    const review = await Review.findByPk(req.params.reviewId);
    if(!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    const {user} = req;
    if(user) {
        if(review.userId = user.id) {
            review.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        }
    }
} );







module.exports = router;