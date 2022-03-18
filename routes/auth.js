const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{session:false},(err,user,info)=>{
        if(err || !user){
            return res.status(400).json({
                message:'something is not right',
                user:user
            });
        }

        req.login(user,{session:false},(err)=>{
            if(err){
                res.send(err);
            }

            const token = jwt.sign(user, 'gila');
            return res.json({user,token})
        })

    })
})
