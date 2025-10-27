import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../Assets/logo.svg";

export default function Contacts({ contacts, changeChat, selectChat }) {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await JSON.parse(localStorage.getItem("chat-app-user"));
        if (data) {
          setCurrentUsername(data.username);
          setCurrentUserImage(data.avatarImage);
        }
      } catch (err) {
        console.log("Error getting user");
      }
    };
    getCurrentUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    selectChat(true);
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h1>Talk</h1>
      </div>

      <div className="contacts">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact ${
              index === currentSelected ? "selected" : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">
              <img src={contact.avatarImage} alt={contact.username} />
            </div>
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>

      {currentUsername && (
        <div className="current-user">
          <div className="avatar">
            <img src={currentUserImage} alt="avatar" />
          </div>
          <div className="username">
            <h2>{currentUsername}</h2>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 73% 15%;
  overflow: hidden;
  background: radial-gradient(circle at top left, #0f172a, #1e293b, #334155);

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    img {
      height: 3rem;
      filter: drop-shadow(0 0 6px #6366f1);
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 1.4rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 0.5rem 0;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
    }

    .contact {
      background: rgba(255, 255, 255, 0.05);
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.7rem 1rem;
      margin: 0.4rem 0;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(99, 102, 241, 0.15);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
      }

      .avatar img {
        height: 2.8rem;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.1);
      }

      .username h3 {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1rem;
        font-weight: 500;
      }

      &.selected {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
        .username h3 {
          color: #fff;
        }
      }
    }
  }

  .current-user {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.8rem;
    .avatar img {
      height: 2.6rem;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    .username h2 {
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    grid-template-rows: 10% 75% 15%;
    .brand h1 {
      font-size: 1.1rem;
    }
    .contacts .contact {
      width: 95%;
      padding: 0.6rem 0.8rem;
      .avatar img {
        height: 2.4rem;
      }
      .username h3 {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 500px) {
    grid-template-rows: 12% 70% 18%;
    .brand img {
      height: 2.4rem;
    }
  }
`;



