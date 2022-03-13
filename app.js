const express = require('express');
const sqlite = require('better-sqlite3');
const passport = require('passport');
const bodyParser = require('body-parser');


const userModel = require('./model/model');




require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/',routes);

app.use('/user',passport.authenticate('jwt',{session:false}),secureRoute);


app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({error:err})
});


app.listen(8080,()=>{
    console.log('server running at localhost:8080/');
});
