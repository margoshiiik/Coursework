import React, {useState}  from "react";
import './Room.css'
import {rooms} from './Rooms'
import "./UserPage.css"
import AreYouSure from "./AreYouSure";
import QuestionBar from './QuestionBar'
import './QuestionBar.css'
import  Axios  from "axios";

export default function Room(props){
    let user = props.user;
    console.log(props.room)
    const [isShown, setIsShown] = useState(false);
    let [myRoom, setRoom] = useState(null)
    let [questions, setQuestions] = useState(null);

    let roomCode = window.location.pathname.slice(6, window.location.pathname.length)

    if(myRoom === null) {
        Axios.get('http://localhost:3001/api/enterRoom', {
        params: {
          code: roomCode,
        }})
        .then((response)=> {
            myRoom = response.data[0];
            setRoom(response.data[0]);
            setRoom((state) => {
                return state;
            });
            console.log(myRoom)
       })
    }

    function sendQuestion(event){
        event.preventDefault(); 
        let data = new Date(); 
        console.log(data)
        Axios.post('http://localhost:3001/api/insertQuestion', {text: document.getElementById('questionHere').value, data: data, user_id: user.user_id, room_id: myRoom.room_id})
            .then(()=> {
                alert('successful send question')
            })
            setQuestions([...questions, {text: document.getElementById('questionHere').value, data: data, user_id: user.user_id, room_id: myRoom.room_id}])
            alert('you sucessfully sent question')
    }


    function showDelete(event){
        event.preventDefault(); 
        setIsShown(current => !current)
    }

    function getQuestions(){
        if(myRoom !== null){
            Axios.get('http://localhost:3001/api/getQuestion', {
          params: {
            id: myRoom.room_id,
          }})
          .then((response)=> {
              console.log(response.data)
              setQuestions(response.data);
              setQuestions((state) => {
                  return state;
              });
              
         })
        }
    }

    if(myRoom !== null && questions !== null) {
        questions.map(elem => {
            console.log(elem.text)
        })
        return (
            <div className="Room">
                <div className="header">
                    <h1 className="mt-4">Welcome in {myRoom.name}!</h1>
                    <h5 className="mt-2">Code to Connect: <span className="code" id="roomCode">{myRoom.code}</span></h5>
                </div>
    
                <button className="btn mt-5 menu" onClick={showDelete}>Delete Room</button>
                
                {isShown && (
                        <div>
                        <AreYouSure room={myRoom} setIsShown={setIsShown}/>
                        </div>
                    )}
                {/* показувати учасників 
                Poll */}
    
                <div className="forQuestion mt-5">
                <input type="text" id="questionHere" className="form-control mt-3"  placeholder="Enter your question"></input>
                <button className="btn mt-2 menu" onClick={sendQuestion}>Send question</button>
                </div>

                <QuestionBar questions={questions} />

            </div>
        )
    } else {
        getQuestions();
    };
    

}