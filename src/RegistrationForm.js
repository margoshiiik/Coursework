import React, {useState, useEffect} from "react";
//import {createUser, showUsers, printUsers} from "./UserTasks.js"
import { NavLink as Link } from "react-router-dom";
import Axios from 'axios' 
import axios from "axios";


export default function RegistrationForm( {setUser}){

    const [newUsername, setNewUserName] = useState('');
    const [newUseremail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserPasswordAgain, setUserPasswordAgain] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setUsers(response.data)
            console.log(response.data)
        })
    }, [])

    const submit = () => {
        console.log(users)
        let isUsernameTaken = users.find((elem) => elem.username === newUsername); 
        if(newUsername.trim()==='' || newUseremail.trim()==='' ||newUserPassword.trim()==='' || newUserPasswordAgain.trim()==='') {
            alert('Please compleate the form')
        } else if(newUserPassword !== newUserPasswordAgain) {
            alert('Password are not the same')
        } else if(isUsernameTaken) {
            alert('This username is taken')
        }
        else {
            Axios.post('http://localhost:3001/api/insert', {username: newUsername, email: newUseremail, password: newUserPassword})
            .then(()=> {
                alert('successful insert')
            })
            alert('you sucessfully registered')
        }
    }

    return (
        <form className="RegistrationForm mt-4">
            <h2>Sign Up</h2>
            <div>
                      <input type="text" id="usernameRegister" name="username" className="form-control mt-3" placeholder="Your Username" onChange={(e) => setNewUserName(e.target.value)} required/>
            </div>
            <div>
                      <input type="email" id="emailRegister" name="email" className="form-control mt-3" placeholder="Your Email" onChange={(e) => setNewUserEmail(e.target.value)} required/>
            </div>
            <div>
                      <input type="password" id="passwordRegister" name="password" className="form-control mt-3" placeholder="Password" onChange={(e) => setNewUserPassword(e.target.value)} required/>
            </div>
            <div>
                      <input type="password" id="form3Example1c" name="password2" className="form-control mt-3" placeholder="Repeat your Password" onChange={(e) => setUserPasswordAgain(e.target.value)} required/>
            </div>

            <button type="submit" className="btn btn-primary mt-3" onClick={submit}>Register</button>
            <Link to="/userpage" activeStyle><button type="submit" className="btn btn-primary mt-3">Open</button></Link>
        </form>
    )
}