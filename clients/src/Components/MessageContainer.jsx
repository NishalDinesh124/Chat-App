import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LogOut from "./LogOut";
import TextInput from "./TextInput";
import axios from "axios";
import { sendMsgRoute } from "../Utils/APIRoutes";
import BackButton from "../Assets/BackButton.png";
import { io } from "socket.io-client";

const socket = io("http://localhost:7000");

export default function MessageContainer({ currentChat, backFunction }) {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("chat-app-user"));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessages = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/getMsg`, {
      from: user._id,
      to: currentChat._id,
    });
    setMessages(res.data);
  };

  const generateRoomId = (userId, currentChat) => [userId, currentChat].sort().join("_");

  useEffect(() => {
    getMessages();
    if (currentChat && user) {
      const newRoomId = generateRoomId(user._id, currentChat._id);
      setRoomId(newRoomId);
      socket.emit("joinRoom", newRoomId);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    const handleIncoming = (data) => {
      setMessages((prev) => [
        ...prev,
        { ...data, fromSelf: data.from === user._id },
      ]);
    };
    socket.on("getMessage", handleIncoming);
    return () => socket.off("getMessage", handleIncoming);
  }, [socket]);

  const handleMsgSend = async (msg) => {
    if (!msg.trim()) return;
    const data = JSON.parse(localStorage.getItem("chat-app-user"));
    await axios.post(sendMsgRoute, { from: data._id, to: currentChat._id, message: msg });
    const messageData = { roomId, message: msg, from: data._id };
    socket.emit("sendMessage", messageData);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <button className="back-btn" onClick={backFunction}>
            <img className="back-btn-img" src={BackButton} alt="back" />
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
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.fromSelf ? "sended" : "received"}`}>
            <div className="content">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <TextInput handleMsgSend={handleMsgSend} />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  background: radial-gradient(circle at top left, #0f172a, #1e293b, #334155);
  backdrop-filter: blur(15px);
  overflow-y:auto;
  border-radius: 0 1em 1em 0; /* optional for smooth right panel edges */
  

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.2rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .user-details {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      .back-btn {
        border: none;
        background: transparent;
        border-radius: 50%;
        transition: background 0.3s ease;
        padding: 4px;

        .back-btn-img {
          width: 26px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }
      }

      .avatar img {
        height: 3rem;
        border-radius: 50%;
        border: 2px solid #6366f1;
      }

      .user-name h3 {
        color: #fff;
        letter-spacing: 1px;
      }
    }
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.2rem;
    gap: 1rem;
    overflow-y: auto;
    scroll-behavior: smooth;

    .message {
      display: flex;
      align-items: center;
      transition: all 0.3s ease;

      .content {
        padding: 0.8rem 1rem;
        font-size: 1rem;
        border-radius: 1.2rem;
        max-width: 65%;
        word-wrap: break-word;
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: #fff;
        box-shadow: 0 0 6px rgba(99, 102, 241, 0.4);
      }
    }

    .received {
      justify-content: flex-start;
      .content {
        background: rgba(255, 255, 255, 0.08);
        color: #e2e8f0;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
      }
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    border-radius: 0;
    .chat-header {
      padding: 0.5rem 0.8rem;
      .avatar img {
        height: 2.5rem;
      }
      .user-name h3 {
        font-size: 1rem;
      }
    }
    .chat-messages .content {
      font-size: 0.9rem;
      max-width: 80%;
    }
  }
`;

