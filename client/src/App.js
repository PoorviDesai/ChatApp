import './App.css';
import io from "socket.io-client";
import {useState} from 'react';
import Chat from './Chat.js';

//establishing connection outside the component
//socket variable
const socket = io.connect("http://localhost:3001");
//in bracket..url where we be running the socket.io server
//connecting frontend to backend

function App() {
  //creating a state representing user name and the other..room

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  
  //function to join room when the user clicks the button
  //do many things like primarily establishing connection bw 
  //users who just entered
  const joinRoom = () => {
    //first alter the username 
    //join a room only when username is not empty and user room is not empty

    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
      //passing room as data so that it creates with the entered room 
      setShowChat(true);

    }


  };


  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>

          <input type="text" placeholder="John..." onChange={(event) => {
            setUsername(event.target.value);
          }} />

          <input type="text" placeholder="Room ID" onChange={(event) => {
            setRoom(event.target.value);
          }} />

          <button onClick={joinRoom}>Join a Room</button>
        </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}

    </div>
  );
}

export default App;
