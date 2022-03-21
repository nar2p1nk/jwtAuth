const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userC = require('./model');


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
                const user =
            }
        }
    )
)
