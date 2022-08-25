const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 
const mysql = require('mysql'); 
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'web-app',
}); 


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM users "
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    }); 
}), 

app.post('/api/insert', (req, res) => {

    const username = req.body.username; 
    const email = req.body.email; 
    const password = req.body.password;

    const sqlInsert = "INSERT INTO users (username, email, password, role, rooms) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [username, email, password, 0, JSON.stringify([])], (err, result) => {
        console.log(result)
    }); 
})

app.post('/api/insertRoom', (req, res) => {

    const name = req.body.name; 
    const code = req.body.code; 
    const user = req.body.user; 


    const sqlInsert = "INSERT INTO rooms (name, code, user_id) VALUES (?, ?, ?)"
    db.query(sqlInsert, [name, code, user], (err, result) => {
        console.log(err)
    }); 
})

app.post('/api/insertQuestion', (req, res) => {

    const text = req.body.text; 
    const data = req.body.data; 
    const user = req.body.user_id;
    const room =  req.body.room_id;


    const sqlInsert = "INSERT INTO questions (user_id, room_id, text, data) VALUES (?, ?, ?, ?)"
    db.query(sqlInsert, [user, room, text, data], (err, result) => {
        console.log(err)
    }); 
})

//update roomList in user
app.post('/api/updateUser', (req, res) => {
    const rooms = req.body.rooms; 
    const user_id = req.body.user; 

    const sqlUpdate = "UPDATE users SET rooms = ? WHERE users.user_id = ?"
    db.query(sqlUpdate, [rooms, user_id], (err, result) => {
        console.log(err)
    }); 
})

//update userList in a room
app.post('/api/updateRoom', (req, res) => {
    const users = req.body.users; 
    const room_id = req.body.room; 

    const sqlUpdate = "UPDATE rooms SET users = ? WHERE rooms.room_id = ?"
    db.query(sqlUpdate, [users, room_id], (err, result) => {
        console.log(err)
    }); 
})

app.get('/api/getUsersRooms', (req, res) => {
     const id = req.query.id; 
     console.log(req.query.id)

    const sqlGetRooms = "SELECT * FROM rooms WHERE user_id = ?"
    db.query(sqlGetRooms, [id], (err, result) => {
        res.send(result);
    }); 
})


app.get('/api/getQuestion', (req, res) => {
    const id = req.query.id; 
    console.log(req.query.id)

   const sqlGetQuestions = "SELECT * FROM questions WHERE room_id = ?"
   db.query(sqlGetQuestions, [id], (err, result) => {
       console.log(res)
       res.send(result);
   }); 
})

app.get('/api/enterRoom', (req, res) => {
    const code = req.query.code; 
    console.log(code)

    const sqlGetRoom = "SELECT * FROM rooms WHERE code = ?"
    db.query(sqlGetRoom, [code], (err, result) => {
        res.send(result);
    }); 
})

app.listen(3001, () => {
    console.log('running on port 3001');
})