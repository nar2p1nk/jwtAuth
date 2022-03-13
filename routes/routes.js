const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

router.post(
    '/login',
    async (req,res,next)=>{
        passport.authenticate(
        'login',
            async(err,user,info)=>{
                try{
                    if(err || !user){
                        const error = new Error('an error occurred');

                        return next(error)
                    }

                    req.login(
                        user,
                        {session:false},
                        async(error)=>{
                            if(error) return next(error);
                            const body = {_id:user.id,username:user.username};
                            const token = jwt.sign({user:body},'TOP_SECRET');

                            return res.json({token});
                        }
                    )

                }catch(error){return next(error)}
            }
    )
    },(req,res,next)=>{
        res.json({user:req.user})
    }
)

module.exports = router;
