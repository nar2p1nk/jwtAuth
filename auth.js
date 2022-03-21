const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const userC = require('./model');
const bcrypt = require('bcrypt');

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password'
        },
         (username,password,done)=>{
            try{
                const user = userC.createUser(username,password);

                return done(null,user,{message:'signup successful'});
            }
            catch(err){done(err)}
        }
    )

)


passport.use(
    'login',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password'
        },
        (username,password,done)=>{
            try{
                const user = userC.findUser(username)
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


passport.use(
    new JWTstrategy(
        {
            secretOrKey:'gila',
            jwtFromRequest: extractJWT.fromUrlQueryParameter('gila')
        },
        async (token,done)=>{
            try{
                return done(null,token.user);
            }
            catch(err){done(err)}
        }
    )
)



