import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Robo from "../Assets/robot.gif";
import LogOut from "./LogOut";

export default function Welcome() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    if (user) setUsername(user.username);
  }, []);

  return (
    <Container>
      <div className="welcome-card">
        <img src={Robo} alt="Welcome Robot" />
        <h1>Welcome, <span>{username}</span> 👋</h1>
        <h3>Select a chat to start messaging</h3>
        <LogOut />
      </div>
    </Container>
  );
}

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: radial-gradient(circle at top left, #0f172a, #1e293b, #334155);
  color: #fff;
  padding: 2rem;
  overflow: hidden;

  .welcome-card {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 1.5rem;
    padding: 3rem 2.5rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: 420px;
    width: 90%;
    animation: fadeIn 0.6s ease-out;
  }

  img {
    height: 18rem;
    animation: ${float} 3s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #e2e8f0;

    span {
      color: #8b5cf6;
      text-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
    }
  }

  h3 {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.75);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media screen and (max-width: 720px) {
    .welcome-card {
      padding: 2rem 1.5rem;
      max-width: 90%;
      gap: 1rem;
    }

    img {
      height: 12rem;
    }

    h1 {
      font-size: 1.4rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
`;
