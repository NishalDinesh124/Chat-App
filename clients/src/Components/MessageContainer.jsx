import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LogOut from './LogOut';
import TextInput from './TextInput'
import axios from 'axios';
import { sendMsgRoute, recieveMsgRoute } from '../Utils/APIRoutes';
import BackButton from "../Assets/BackButton.png"
import {io} from 'socket.io-client';
//import { data } from 'react-router-dom';

const socket = io(process.env.REACT_APP_API_URL || "https://chat-app-dixz.onrender.com");


export default function MessageContainer({ currentChat, backFunction }) {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");

  const user = JSON.parse(
    localStorage.getItem('chat-app-user')
  );
  const getMessages = async () => {   
    axios.request({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/api/messages/getMsg`,
      data: {
        from: user._id,
        to: currentChat._id
      },

    }).then(res => {
      setMessages(res.data)
    })
  }
const generateRoomId =(userId, currentChat)=>{
return [userId,currentChat].sort().join("_");
}
useEffect(() =>{
  getMessages();
  if(currentChat && user){
    const newRoomId = generateRoomId(user._id, currentChat._id)
    setRoomId(newRoomId)
    socket.emit("joinRoom",newRoomId);
  }
}, [currentChat]);

useEffect(() => {
  if (!socket) return;


  const handleIncoming =async (data) => {
    setMessages((prev) => [
      ...prev,
      {
        ...data,
        fromSelf: data.from === user._id,
      },
    ]);
  };

  socket.on("getMessage", handleIncoming);

  return () => {
    socket.off("getMessage", handleIncoming); 
  };
}, [socket]);


// message sending funtion
const handleMsgSend = async (msg) => {
  if (!msg.trim()) return;

  const data = JSON.parse(localStorage.getItem('chat-app-user'));

  await axios.post(sendMsgRoute, {
    from: data._id,
    to: currentChat._id,
    message: msg,
  });

  const messageData = {
    roomId,
    message: msg,
    from: data._id,
  };
  socket.emit("sendMessage", messageData);
  // setMessages((prev) => [...prev, { ...messageData, fromSelf: true }]);
};


  return (
    <Container>
      <div className="chat-header">
       
        <div className="user-details">
        <button className='back-btn'>
        <img className = "back-btn-img" src={BackButton} alt="button" onClick={backFunction}/>
        </button>
          <div className="avatar">
            <img src={currentChat.avatarImage} alt="" />
          </div>
          <div className="user-name">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <LogOut />
      </div>
      <div className="chat-messages">
        {messages && messages.map((message, index) => {
          return (
            <div key={index}>
              <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                <div className='content'>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
      <TextInput handleMsgSend={handleMsgSend} />

    </Container>
  )
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
overflow: hidden;

.chat-header{
  width: 98%;
  border-bottom: solid 1px #e5e5e5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
    .user-details{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.6rem;
      padding: 2rem;
      .avatar{
       img{
      height: 3rem;
    }
     
      }
    .back-btn{
    border: none;
    border-radius: 2em;
    width: 35px;
    height: 35px;

    .back-btn-img{
      width: 26px;
      }
    }
     .back-btn:hover  {
    cursor: pointer;
    background-color: #96badd;
    }
     
    
  }
}
.chat-messages{
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  overflow: auto;
  .sended{
    display: flex;
    justify-content: flex-end;
    .content{
      background-color:  #386b9d;
      color: #fff
    }
  }
  .recieved{
  justify-content: flex-start;
  .content{
    background-color: #3126261c;
  }
  
}
}
.message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
      }
    }
`
