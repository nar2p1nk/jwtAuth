const router = require('express').Router();


router.get(
    '/profile',
    (req,res,next)=>{
        console.log(req.user)
        res.json({
            message: 'you made it, im proud of you',
            user:req.user,
            token:req.query.secret_token
        })
    },(req,res)=>{
        res.json({eat:'ass'})
    }
);

console.log('secure routes')

module.exports = router;
