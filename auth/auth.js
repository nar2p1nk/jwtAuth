const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const model = require('../model/model');
const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = new sqlite('../users.db');

passport.use(
    new JWTStrategy(
        {
            secretOrKey:'TOP_SECRET',
            jwtFromRequest: extractJWT.fromUrlQueryParameter('secret_token')
        },
        async(token,done)=>{
            try{return done(null, token.user)}
            catch(error){done(error)}
        }
    )
)



passport.use('signup', new localStrategy(
    {
        usernameField:'username',
        passwordField:'passport'
    },
    async (username,password,done)=>{
        try{
            model.createUser(username,password)
            const getUser = db.prepare(`
            SELECT FROM user WHERE username = ?`).get(username)
            return done(null,getUser);
        }
        catch(err){{done(err)}}
    }
))

passport.use('login', new localStrategy(
    {
        usernameField:'username',
        passwordField:'password'
    },
    (username,password,done)=>{
        try{
            const user = db.prepare(`SELECT FROM
            user WHERE username = ?`).get(username);
            if(!user){
                return done(
                null,false,{message:'there is no user by that name'})
            }
            const validate = bcrypt.compareSync(password, user.password)

            if(validate == false){
                return done(null,false,{message:'wrong password'})
            }
            return done(null,user,{message:'login is successful'})
        }
        catch(err){return done(err)}
    }
))



