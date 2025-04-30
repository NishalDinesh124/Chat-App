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
          <button>
            <IoMdSend />

          </button>
        </form>
      </Container>
    </>

  )
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  justify-content: center;
  padding: 0 2rem;
  gap:1em;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    
  }

  .emoji-picker {
    position: relative;

    .emoji-smile {
      font-size: 1.5rem;
      cursor: pointer;
      color: #386b9d;
      margin-bottom: 0.5rem;
    }

    .EmojiPickerReact {
      position: absolute;
      bottom: 50px; /* Adjust as needed */
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
   }

.input-container{
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    border: 1px solid #817474;
    input{
    width: 100%;
    height: 3rem;
    border: none;
    color: black;
    background-color: #3126261c;
    border-radius: 3em;
       &:focus{
        outline: none;
       }
       &::placeholder{
        color: black;
       }
    }
    button{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        border: none;
        svg{
            color: #2980b9;
            font-size: 1.3rem;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
    }
}
}`

