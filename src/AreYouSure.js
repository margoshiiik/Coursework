import React, {useState} from "react";
import {rooms} from "./Rooms.js"

export default function AreYouSure( {setIsShown} ){
    function deleteRoom(){
        let code = document.getElementById('roomCode').innerHTML; 
        console.log(rooms)
        let rooms2 = arrayRemove(rooms, code)
        console.log(rooms2);
    } 

    function arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele.code != value; 
        });
    }

    return (
        <div className="mt-3">
            <h3>Are you sure?</h3>
            <button className="btn" onClick={deleteRoom}>Yes</button>
            <button className="btn" onClick={() =>{setIsShown(false)}}>No</button>
        </div>
    )
}