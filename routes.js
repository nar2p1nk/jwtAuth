const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userC = require('./model');
const router = express.Router();

router.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(!username){res.json({error:'no username found'})}
    if(!password){res.json({error:'no password found'})}
    else{
    userC.createUser(req.body.username,req.body.password)
    res.json({
        username:req.body.username,
        message:'user created'
    })
    }
}
);

router.post(
    '/login',
    (req,res,next)=>{
        passport.authenticate(
            'login',
             (err,user,info)=>{
                try{
                    if(!user){
                        const error = new Error('An error has occurred')
                        res.json({message:info.message})
                        return next(error)
                    }
                    req.login(
                        user,
                        {session:false},
                         (error) =>{
                            if(error) return next(error);
                             console.log(user.id,user.username)
                            const body = {id:user.id,username:user.username};
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
