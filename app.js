const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const userC = require('./model');

require('./auth');

const routes = require('./routes');
const secureRoutes = require('./secure-routes');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use('/',routes)

app.use('/user',passport.authenticate('jwt',{session:false}), secureRoutes);



app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({error:err});
});


app.listen(8000,()=>{
    console.log(`server running at localhost:8000/`)
})
