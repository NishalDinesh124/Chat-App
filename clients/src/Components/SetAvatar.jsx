import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../Assets/loader.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../Utils/APIRoutes";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch avatars on component mount
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const seeds = Array.from({ length: 8 }, () =>
          Math.random().toString(36).substring(7)
        );

        const urls = seeds.map(
          (seed) => `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`
        );

        setAvatars(urls);
      } catch (error) {
        console.error("Failed to load avatars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));

      try {
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          toast.success("Avatar successfully created");
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          navigate('/');
        } else {
          toast.error("Error setting avatar. Please try again");
        }
      } catch (error) {
        toast.error("Error setting avatar. Please try again");
      }
    }
  };

  if (isLoading) {
    return (
      <Container>
        <img src={loader} alt="loader" className="loader" />
      </Container>
    );
  }

  return (
    <Container>
      <div className="title-container">
        <h1>Pick an Avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
          >
            <img
              src={avatar}
              alt={`Avatar ${index}`}
              onClick={() => setSelectedAvatar(index)}
              className="avatar-img"
            />
          </div>
        ))}
      </div>
      <button onClick={setProfilePicture} className="submit-btn">
        Set as Profile Picture
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
color: #fff;
gap: 3rem;
height:100vh;
width: 100vw;
background-color: #1c3d53;
.avatars{
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  img{
    height: 100px;
  }
  .avatar{
    display: flex;
    border-radius: 5rem;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    border:0.4rem solid transparent;
  }
  .selected{
    border: solid 5px #466277;
    border-radius: 7rem;
  }
}
.loader {
    max-inline-size: 100%;
    align-items: center;
  }
  .submit-btn{
    padding: 1rem 5rem;
        background-color: #386b9d;
        border: none;
        border-radius: 2rem;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
        cursor: pointer;
        &:hover{
            background-color: #607c83;
        }
  }
  `




