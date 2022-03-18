const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt')
const db = new sqlite('users.db');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;


passport.use(new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'gila'
    },
    function(jwtPayload,done){
        const user = db.prepare(`
        SELECT * FROM user WHERE id = ?`).get(jwtPayload.id);
        return done(null, user)

    }
))


passport.use(new localStrategy({
    usernameField:'username',
    passwordField:'password'
},
    function(username,password,done){
       const user = db.prepare(`
        SELECT * FROM user WHERE username = ?`).get(username)
        if(!user){
            return done(null,false,{message:'there is no user by that name'})
        }
        else{
            if(bcrypt.compareSync(password, user.password)){
                return(null,user,{message: 'login successful'})
            }
            else return(null,false,{message:'password is incorrect'})
        }
    }
))


//CreateUser('billy','animelover99')

