const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const sqlite = require('sqlite3');
const bcrypt = require('bcrypt')
const db = new sqlite.Database('users.db');
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
        db.get(`SELECT * FROM user WHERE name = ?`,[username],async (err,row) =>{

        if(row == null){
            return done(null,false,{message:'no user found'})
        }
        try{
            if(await bcrypt.compare(password,row.password)){
                return done(null,row)
            }
            else{ return done(null,false,{message:'incorrect password'}) }
        }
        catch(e){return done(e)}
    } )
    }
))

//CreateUser('billy','animelover99')

