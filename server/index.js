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

app.post('/api/enterRoom', (req, res) => {
    // const rooms = req.body.rooms; 
    // const user_id = req.body.user; 

    // const sqlUpdate = "UPDATE rooms SET users = ? WHERE rooms.user_id = ?"
    // db.query(sqlUpdate, [rooms, user_id], (err, result) => {
    //     console.log(err)
    // }); 
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