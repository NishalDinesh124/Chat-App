import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from "react-icons/io";


export default function TextInput(props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (emojiObject) => {
    setMsg(prevMsg => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    props.handleMsgSend(msg);
    setMsg("");
  }
  return (
    <>
      <Container>
        <div className="emoji-picker">
          <div className="emoji-smile">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className='input-container' onSubmit={sendChat} >
          <input type="text"
            placeholder='Enter message here...'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}

          />
          <button className='snd-btn'>
            <IoMdSend />

          </button>
        </form>
      </Container>
    </>

  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0 5px;
  gap:1em;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    
  }

  .emoji-picker {
    position: relative;

    .emoji-smile {
      font-size: 1.5rem;
      cursor: pointer;
      color:  #8b5cf6;
      margin-left: 1em;
    }

    .EmojiPickerReact {
      position: absolute;
      bottom: 50px; 
      left: 0;
      z-index: 10;
      width: 300px;
      max-height: 350px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      border-radius: 1rem;
    }
  }


/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #868585;
  border-radius: 3rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


.input-container{
  position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 1rem;

    input{
    width: 100%;
    height: 3rem;
    border: none;
    color: #fff;
    padding-left: 15px;
    background-color: #1916164a;
    border-radius: 3em;
       &:focus{
        outline: solid 1px #8b5cf6;
       }
       &::placeholder{
        color: #fff;
       }
    }
    .snd-btn{
       position: absolute;
       right: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        border: none;
        svg{
            color:#8b5cf6;
            font-size: 1.8rem;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
    }
}
}`

