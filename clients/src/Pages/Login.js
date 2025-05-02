import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Logo from "../Assets/logo.svg"
import { useNavigate, Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from '../Utils/APIRoutes'

function Login() {
  const navigate = useNavigate();
    useEffect(()=>{
      if (localStorage.getItem('chat-app-user')) {
        navigate('/')
      }
   },[navigate])


  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleValidation = () => {
    if (username === "") {
      toast.error("Username required");
      return false;
    } else if (password === "") {
      toast.error("Password required")
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(loginRoute,
        {
          username,
          password,
        });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        toast.success("Login successfull");
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/');
      }

    }
  }
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={handleSubmit}>
          <div className='brand'>
            <img src={Logo} alt="" />
            <h1>Talk</h1>
          </div>
          <input
            type="text"
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => { setUsername(e.target.value) }} />
          <input
            type="password"
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
          <button>Submit</button>
          <span>Dont have an account? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
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
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #1c3d53;

.brand{
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
}
::placeholder{
    color: #fff;
}
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: #386b9d;
    border-radius: 2rem;
    padding: 4rem 5rem;
    input{
        background: transparent;
        border: solid 2px #fff;
        border-radius: 2rem;
        padding: 1rem 3rem;
        color: white;
        font-size: 1rem;
        &:focus{
            border: solid 2px #9db189;
            outline: none;
        }
    }
    button{
        padding: 1rem 5rem;
        background-color: #1c3d53;
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
        span{
            color: white;
            text-transform: uppercase;
            a{
                text-decoration: none;
                text-transform: uppercase;
                color: #1c3d53;
            }
        }
}
        @media screen and (max-width: 720px){
        form{
        height: 100vh;
        width : 100vw;
        }
    }
`;

export default Login;