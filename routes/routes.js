const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup',{session:false}),
    async(req,res,next)=>{
        res.json({
            message:'signup successful',
            user:req.user
        });
    }
)

module.exports = router;
