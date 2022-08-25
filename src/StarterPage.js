import React, {useState, useEffect} from "react";
import 'reactjs-popup/dist/index.css';
import './StarterPage.css'
import { NavLink as Link } from "react-router-dom";
import { rooms } from "./Rooms.js"
import { users } from "./Users.js"
import RegistrationForm from './RegistrationForm'

import Axios from "axios";

function StarterPage({ setUser }){
    const [isShown, setIsShown] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState(''); 

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setUsers(response.data)
            console.log(response.data)
        })
    }, [])

    const logUser = (e) => {
        e.preventDefault();
        let user = users.find((elem) => elem.username === username); 
        console.log(user)
        if(username==='' || password ==='') alert ('Please compleate the form')
        else if(user.password !== password) alert ('Wrong password'); 
        else {
            setUser(user) 
        }
    }

    function showRegisterForm(event){
        event.preventDefault();
        setIsShown(current => !current);
    }

    return (
        <div className="StarterPage">
            <form>
                <div>
                    <label className="form-label">Enter your username:</label>
                    <input  className="form-control" id="userUsername" aria-describedby="emailHelp" onChange={(e) => setUserName(e.target.value)} required/>
                </div>
                <div className="mt-3">
                    <label className="form-label">Enter your password: </label>
                    <input type="password" className="form-control" id="userPassword" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3 enterButton" onClick={logUser}>Enter</button>
                <Link to="/userpage"><button type="submit" className="btn btn-primary mt-3">Open</button></Link>
                <button type="submit" className="btn btn-primary mt-3" onClick={showRegisterForm}>Register</button>
                </form>

                {isShown && (
                    <div>
                    <RegistrationForm />
                    </div>
                )}
    
        </div>
    )
}

export default StarterPage; 