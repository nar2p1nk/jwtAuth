const router = require('express').Router();
const passport = require('passport');
require('../passport');

router.get('/',(req,res,next)=>{
    res.send('respond with a resource');
});


router.get('/profile',(req,res,next)=>{
    res.json({
        status:'ok',
        user:req.user
    });
});

function checkAuth(req,res,next){
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        req.user = user;
        next();
//        if(err){
//            res.status(500).send({message:'Internal Server Error'})
//            return next();
//        }
//        if(user){
//            req.user = user;
//            return next();
//        } else{
//            res.status(401).send({message:'Unauthorized'})
//        }
//        next();
    })
}



module.exports = router;
