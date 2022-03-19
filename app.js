const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./passport');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

const auth = require('./routes/auth');
const user = require('./routes/user');

app.use('/auth',auth)
app.use('/user',passport.authenticate('jwt',{session:false}),user)

app.get('/prof',checkAuth)

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



app.listen(8000,()=>{
    console.log(`server running at localhost:8000/`)
})
