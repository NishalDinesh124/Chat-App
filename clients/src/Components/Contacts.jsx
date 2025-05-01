import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../Assets/logo.svg';

export default function Contacts(props) {
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
   

    useEffect(() => {
        getCurrentUser();
    }, [])
    const getCurrentUser = async () => {

        try {
            const data = await JSON.parse(localStorage.getItem('chat-app-user'));
            setCurrentUsername(data.username);
            setCurrentUserImage(data.avatarImage);
        } catch (err) {
            console.log("Error getting user")
        }
        const data = await JSON.parse(localStorage.getItem('chat-app-user'));
        setCurrentUsername(data.username);
        setCurrentUserImage(data.avatarImage);
    }

    const changeCurrentChat = (index, contact) => { 
        props.selectChat(true);
        setCurrentSelected(index);
        props.changeChat(contact)
    }
    return (
        <>
        <Container >
                
                <div className="brand">
                <img src={Logo} alt="" />
                <h1>Talk</h1>
            </div>
            <div className="contacts">
                {props.contacts.map((contact, index) => {
                    return (
                        <div className={`contact ${index === currentSelected ? "contact-background" : "normal-background"
                            }`}>
                            <div key={contact._id} className={`contact ${index === currentSelected ? "selected" : ""
                                }`}
                                onClick={() => changeCurrentChat(index, contact)}>
                                <div className="avatar">
                                    <img src={`${contact.avatarImage}`} alt="" />
                                </div>
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>

           
        </Container>
       
            

        </>
    )
}

const Container = styled.div`
display: grid;
flex-direction: column;
grid-template-rows:10% 76% 14%;
border-right: solid 1px #e5e5e5;
overflow: auto;
 transition: opacity 0.5s ease, height 0.5s ease;

::-webkit-scrollbar {
  width: 8px;
}

.brand{
background-color: #386b9d;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    border-top-left-radius: 1em;
    gap: 0.5rem;
    img{
        height: 4rem;
    }
    h1{
        color: #000000;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;

    .contact-background{
    border-top: solid 0.5px grey;
   display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #386b9d;
        }
    .normal-background{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
        }
    .contact{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        min-height: 5rem;
        cursor: pointer;
        padding: 0.5rem;
         transition: 0.9s;
     img{
        height: 3rem;
    }
    
    }
   
    
    
}
.current-user{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #b7bbbe;
    border-bottom-left-radius
    gap: 0.8rem;
    img{
        height: 3rem;
    }
    }

       @media screen and (max-width: 720px){
       border: none;
       .brand{
       border-top-right-radius: 1em;}
    }
    
`


