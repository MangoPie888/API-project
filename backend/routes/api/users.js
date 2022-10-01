const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('You need a firstName.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('You need a lastName.'),
    handleValidationErrors
  ];


//sign up a new user
router.post(
    '/',validateSignup,
    async (req, res) => {
      const {firstName,lastName, email, password, username } = req.body;

      const exitEmail = await User.findOne({
        where:{email}
      });

      const exitUserName = await User.findOne({
        where:{username}
      });

      if(exitEmail || exitUserName) {
        res.status(403),
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }else{
      const user = await User.signup({ firstName,lastName,email, username, password });

      let token = await setTokenCookie(res, user);

      return res.json({
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        username:user.username,
        token
      });
    }}
      
  );










module.exports = router;