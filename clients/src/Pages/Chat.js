import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../Utils/APIRoutes";
import Contacts from "../Components/Contacts"
import MessageContainer from "../Components/MessageContainer";
import Welcome from "../Components/Welcome";


export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selected, setSelected] = useState(false);
/////////////////// may be romoved
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh(); // initial set
    window.addEventListener('resize', setVh); // update on resize

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  ///////////// may be romoved
  useEffect(() => {
    getCurrentUser()
  }, []);

  useEffect(() => {
    getContacts();
  }, [currentUser]);
  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }

  const getCurrentUser = async () => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem('chat-app-user')
        )
      );
    }
  }
  const handleChatChange = (contact) => {

    if (contact !== currentChat) {
      setCurrentChat(contact);
    }

  };
  const handleHiddenTab = (select) => {
    setSelected(select)

  }
const handleBackFunction=(()=>{
  setSelected(false)
})
  return (
    <>
      <Container>
        <div className="container">
          <div className={`tab ${selected ? "hidden-tab" : ""}`}>
            <Contacts contacts={contacts} changeChat={handleChatChange} selectChat={handleHiddenTab} />
          </div>

          {currentChat &&selected? (
            <MessageContainer
              currentChat={currentChat}
              backFunction={handleBackFunction}

            />
          ) : (
            <Welcome/>
          )}
        </div>

      </Container>
    </>
  );
}

const Container = styled.div`

.tab{
  display: grid;
flex-direction: column;
border-right: solid 1px #e5e5e5;
overflow: auto;
  }

  height: calc(var(--vh, 1vh) * 100);
 padding-bottom : env(safe-area-insert-bottom);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #1c3d53;

  
  .container {
  border-radius: 1em;
    height: 85vh;
    width: 85vw;
    display: grid;
    background-color: #ffff;
    grid-template-columns: 25% 75%;

    @media screen and (max-width: 720px){
    grid-template-columns: 100%;
    .tab{
    border: none;
    }
    .hidden-tab{
      display:none;
}
    }

      
}
  }
`;
