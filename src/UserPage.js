import React, {useState} from "react";
import { NavLink as Link } from "react-router-dom";
import {rooms} from './Rooms'
import "./UserPage.css"
import "./CreateNewRoom.css";
import EnterRoom from "./EnterRoom";
import Axios from "axios";

function UserPage(props){
  let [user, setUser] = useState(props.user);
  let [roomCode, setRoomCode] = useState(null);
  let [roomName, setRoomName] = useState(''); 
  let [userRooms, setUserRooms] = useState(null); 
  let [isCreateShown, setIsCreateShown] = useState(false);
  let [isEnterShown, setIsEnterShown] = useState(false); 

  //let rooms = JSON.parse(user.rooms);
  if(userRooms == null) {
    Axios.get('http://localhost:3001/api/getUsersRooms', {
      params: {
        id: user.user_id,
      }})
      .then((response)=> {
          setUserRooms(response.data);

          setUserRooms((state) => {
              return state;
          });
     })
  }

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
      setUserRooms([...userRooms, {name: roomName, code: code, user: props.user.user_id}])

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

  function wantThisRoom(event){
      event.preventDefault();
      console.log(event.target)
      setRoomCode(event.target.getAttribute('name'));
      console.log(roomCode)
  }

  function showEnterForm(event){
    event.preventDefault();
    setIsEnterShown(current => !current);
    setIsCreateShown(false);
  }

  function showCreateForm(event){
    event.preventDefault();
    setIsCreateShown(current => !current);
    setIsEnterShown(false);
  }

  if(userRooms !== null) {
    userRooms.map(elem => {
      console.log(elem);
    })
    return (
        <div className="UserPage">
        <h1 className="mt-3">Hello, {props.user.username}!</h1>
        <input type="text" className="form-control mt-4 finder" placeholder="Find the room"/>
          <div className="mt-4">
            <button className="btn menu" onClick={showCreateForm}>Create Room</button>
            
            <button className="btn menu" onClick={showEnterForm}>Enter the Room</button>
            <button className="btn menu">Settings</button>
          </div>
          {isCreateShown && (
                    <div className="CreateNewRoom">
                    <h2>Create new room</h2>
                     <input type="text" id="nameForNewRoom" className="form-control mt-3" placeholder="Enter the name of the room" onChange={(e) => setRoomName(e.target.value)} required/>
                     <div><button className="btn mt-3 menu" onClick={createNewRoom}>Create</button></div>
                     {/* <Link to={`/room/${roomId}`} className="link" activeClassName={"active"}>Enter the room</Link> */}
                </div>
          )}
          {isEnterShown && (
                    <div>
                    <EnterRoom user={user}/>
                    </div>
          )}
          <div className="row rooms mt-5"> 
            {
            userRooms.map((elem, index) => {
                return (
                <div title={elem.name} className="col-3 room" key={index}>
                   <h3>{elem.name}</h3>
                    <button className="btn buttonRoom mt-3" name={elem.code} onClick={wantThisRoom}>Select this room</button>
                    <Link to={`/room/${roomCode}`} className="link" activeClassName={"active"}>Enter the room</Link>
                </div>)
            } 
            )}
          </div>

                
        </div>
    )
          }

}

export default UserPage; 


