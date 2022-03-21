const router = require('express').Router();


router.get(
    '/prof',
    (req,res,next)=>{
        res.json({
            message: 'you made it, im proud of you',
            user:req.user,
            token:req.query.secret_token
        })
    }
);


module.exports = router;
