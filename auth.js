const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const userC = require('./model');
const bcrypt = require('bcrypt');
const jwtSimple = require('jwt-simple');
const jwt = require('jsonwebtoken');
//passport.use(
//    'signup',
//    new localStrategy(
//        {
//            usernameField:'username',
//            passwordField:'password'
//        },
//         (username,password,done)=>{
//            try{
//                const user = userC.createUser(username,password);
//                //const user = {username:username,password:password}
//                return done(null,user,{message:'signup successful'});
//            }
//            catch(err){
//                console.log('an error has occured in auth signup')
//                return done(null,err)}
//        }
//    )
//
//)


passport.use(
    'login',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password'
        },
        (username,password,done)=>{
            try{
                const user = userC.findUserByUsername(username)
                if(!user){
                    return done(null,false,{message:'no user found'})
                }

                const validate = bcrypt.compareSync(password, user.password);
                if(!validate){
                    return done(null,false,{message:'wrong password'});
                }
                return done(null,user,{message:'user authenticated'})
            }
            catch(err){return done(err)}
        }
    )
)


// jwtStrategy returns some weird object, use jsonwebtoken instead

//passport.use(new JWTstrategy(
//    {
//        secretOrKey:'gila',
//        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
//        passReqToCallback:true
//    },
//        (payload,done)=>{
//            console.log(payload.sub)
//            const user = userC.findUserById(payload.user.id)
//            console.log('jwt after')
//            console.log(user)
////            if(err){return done(err,false)}
//            if(user){return done(null,user)}
////            else{return done(null,false)}
//            
//        }
//    )
//)



