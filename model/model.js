const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt')
const db = new sqlite('users.db');

db.prepare(`CREATE TABLE IF NOT EXISTS user(
id INTEGER PRIMARY KEY NOT NULL,
username TEXT NOT NULL,
password TEXT NOT NULL
)`).run();


function createUser(username,password){
    const alreadyExist = db.prepare(`
    SELECT * FROM user WHERE username = ?`).get(username);
    if(alreadyExist){
        return 'username is already taken'
    }
    else{
        hashedPassword = bcrypt.hashSync(password, 10)
        db.prepare(`INSERT INTO user(
        username,password) VALUES(?,?)`).run(username,hashedPassword)
        return 'user created'
    }
};

function authUser(username,password){
    const user = db.prepare(`SELECT * FROM user
    WHERE username = ?`).get(username)
    if(!user){return 'there is no user by that name'}
    else{
        const hash = bcrypt.compareSync(password, user.password)
        return hash
    }
}

module.exports = createUser,authUser

//createUser('emilia', 'galangPalad')
//console.log(createUser('hillock', 'eatass'))

console.log(authUser('emilia','galangPalad'))
