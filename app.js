const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./passport');

const app = express();

app.use(express.urlencoded({extended:false}))

app.use(bodyParser.json())

const auth = require('./routes/auth');
const user = require('./routes/user');

app.use('/auth',auth)
app.use('/user',passport.authenticate('jwt',{session:false}),user)


app.listen(8000,()=>{
    console.log(`server running at localhost:8000/`)
})
