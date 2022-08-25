import React, {useState} from "react";
import {rooms} from "./Rooms.js"
import {users} from "./Users.js"
import { NavLink as Link } from "react-router-dom";
import Axios from 'axios'

export default function EnterRoom(props){
    let [thisRoom, setRoom] = useState(null); 
    let [roomCode, setRoomCode] = useState('');
    

    let room; 

    function enterTheRoom(event){
        event.preventDefault(); 
        console.log(roomCode)
        
        Axios.get('http://localhost:3001/api/enterRoom', {
            params: {
              code: roomCode,
            }})
            .then((response)=> {
                room = response.data[0];
                setRoom(response.data[0]);

                setRoom((state) => {
                    return state;
                });
            })
        
        if(room === null){
            alert('this room does not exist')
        }
        else{
            console.log(thisRoom)
            setRoomCode(thisRoom.code)
            setRoomCode((state) => {
                return state;
            });

             Axios.post('http://localhost:3001/api/insertRoom', {name: thisRoom.name, code: thisRoom.code, user: props.user.user_id}).then(()=> {
                alert('successful insert')
            })
             alert('successful update')

        }
    }

    return (
        <div className="CreateNewRoom">
            <h2>Enter the room</h2>
             <input type="text" id="codeForEnter" className="form-control mt-3" placeholder="Enter the code of the room" onChange={(e) => setRoomCode(e.target.value)} required/>
             <div><button className="btn mt-3 menu" onClick={enterTheRoom}>Select</button></div>
             <Link to={`/room/${roomCode}`} className="link" activeClassName={"active"}>Enter the room</Link> 
        </div>
    )
}