const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite('todoWUser.db');

db.exec(`CREATE TABLE IF NOT EXISTS user(
id INTEGER PRIMARY KEY NOT NULL,
username TEXT NOT NULL,
password TEXT NOT NULL);
`);

db.exec(`CREATE TABLE IF NOT EXISTS todo(
todoId INTEGER PRIMARY KEY NOT NULL,
todo TEXT NOT NULL,
todoUser INTEGER,
FOREIGN KEY(todoUser) REFERENCES user(id)
);
`);


function createUser(username,password){
    const hashedPassword = bcrypt.hashSync(password, 10)
    db.prepare(`INSERT INTO 
    user(username,password) VALUES(?,?)`).run(username,hashedPassword)
}

function createTodo(todo,userId){
    db.prepare(`INSERT INTO todo(todo,todoUser) 
    VALUES(?,?)`).run(todo,userId)
}

function ifUser(username,password){
    const user = db.prepare(`SELECT * FROM user
    WHERE username = ?`).get(username)
    if(!user){
        console.log('there is not user by that name')
        return false
    }
    else{
        const hashedPasswordBool = bcrypt.compareSync(password, user.password)
        if(hashedPasswordBool === true){
            console.log('user authenticated')
            return true
        }
        else{
            console.log('wrong password')
            return false
        }
    }
}

//createUser('emilia', 'amelia')

ifUser('emilia', 'amelia')
