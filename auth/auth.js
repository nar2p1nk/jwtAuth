const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const model = require('../model/model');


passport.use('signup', new localStrategy(
    {
        usernameField:'username',
        passwordField:'passport'
    },
    async (username,password,done)=>{
        try{
            const user = model.createUser(username,password)
        }
        catch{}
    }
))
