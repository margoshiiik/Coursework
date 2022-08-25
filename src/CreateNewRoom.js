import React, {useState, useEffect} from "react";
import "./CreateNewRoom.css"
import "./UserPage.css"
import {rooms} from "./Rooms.js"
import { NavLink as Link } from "react-router-dom";
import Axios from "axios";

export default function CreateNewRoom(props){
    let [roomName, setRoomName] = useState(''); 
    let [rooms, setRooms] = useState(props.rooms)
    
    function createNewRoom(event){
        event.preventDefault(); 
        let code = makeCode(15); 
        Axios.post('http://localhost:3001/api/insertRoom', {name: roomName, code: code, user: props.user.user_id})
            .then(()=> {
                alert('successful insert')
            })
            alert('you sucessfully add room')

        // let myArr = JSON.parse(props.user.rooms);
        // console.log(myArr)
        setRooms([...rooms, {name: roomName, code: code, user: props.user.user_id}])

        // Axios.post('http://localhost:3001/api/updateUser', {rooms: JSON.stringify(myArr), user: props.user.user_id})
        // .then(()=> {
        //     alert('successful update')
        // })
        // alert('successful update')
    }

    function makeCode(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    return (
        <div className="CreateNewRoom">
            <h2>Create new room</h2>
             <input type="text" id="nameForNewRoom" className="form-control mt-3" placeholder="Enter the name of the room" onChange={(e) => setRoomName(e.target.value)} required/>
             <div><button className="btn mt-3 menu" onClick={createNewRoom}>Create</button></div>
             {/* <Link to={`/room/${roomId}`} className="link" activeClassName={"active"}>Enter the room</Link> */}
        </div>
    )
}