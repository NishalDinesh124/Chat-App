import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Robo from '../Assets/robot.gif';
import LogOut from './LogOut';

export default function Welcome() {
    const [username, setUsername] = useState("");

    useEffect(()=>{
        getUser();
    },[])

    const getUser = async()=>{
       const user =await JSON.parse(localStorage.getItem('chat-app-user'));
       setUsername(user.username);
    }
  return (
    <Container>
 <img src={Robo} alt="" /> 
 
    <h1>{username}</h1>
    <h3>Select a chat to Start Messaging</h3>
    <LogOut/>
    </Container>
   

  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
img{
    height: 30rem;
}
    @media screen and (max-width: 720px){
    grid-template-columns: 100%;
    display:none;
}
`

