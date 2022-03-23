const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userC = require('./model');
const express_jwt = require('express-jwt');
require('./auth');

const routes = require('./routes');
const secureRoutes = require('./secure-routes');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use('/',routes)

app.use(express_jwt({secret:'gila',algorithms:['HS256']}))

app.get('/protected',
    authenticatejwt,
    (req,res)=>{
        res.json({
            status:200,
            user:'verified',
            welcome:req.user.user.username
        })
    }
)


app.use('/user',
//    authenticatejwt,
    secureRoutes);

app.get('/',(req,res)=>{
    res.json({server:req.query.token})
})

function authenticatejwt(req,res,next){
        const user = userC.findUserById(req.user.user.id)
        if(!user){
            console.log('no user found')
            res.sendStatus(401)
        }
            next();
        }


app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({error:err});
});


app.listen(8000,()=>{
    console.log(`server running at localhost:8000/`)
})
