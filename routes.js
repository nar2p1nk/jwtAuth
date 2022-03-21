const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post(
    '/signup',
    passport.authenticate('signup',{session:false}),
    (req,res)=>{
        res.json({
            message:'Signup successful',
            user:req.user
        })
    }
)

router.post(
    '/login',
    (req,res,next)=>{
        passport.authenticate(
            'login',
             (err,user,info)=>{
                try{
                    if(!user){
                        const error = new Error('An error has occurred')
                        return next('ajjjj')
                    }
                    req.login(
                        user,
                        {session:false},
                         (error) =>{
                            if(error) return next(error);

                            const body = {_id:user.id,username:user.username};
                            const token = jwt.sign({user:body},'gila');

                            return res.json({token});
                        }
                    );
                }
                catch(err){return next(err)}
            }
    )(req,res);
    }
)



module.exports = router
