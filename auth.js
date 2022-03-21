const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
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

                return done(null,user);
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
