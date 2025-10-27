import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../Assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utils/APIRoutes";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const handleValidation = () => {
    if (password !== confirm) {
      toast.error("Passwords must match");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters");
      return false;
    } else if (password.length < 5) {
      toast.error("Password should be at least 5 characters");
      return false;
    } else if (email.trim() === "") {
      toast.error("Email is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        toast.success("Account created successfully");
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Talk</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top left, #0f172a, #1e293b, #334155);

  form {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 3rem 4rem;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 90%;
    max-width: 380px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);

    .brand {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      img {
        height: 4rem;
        filter: drop-shadow(0 0 6px #6366f1);
      }
      h1 {
        color: #fff;
        text-transform: uppercase;
        font-size: 1.8rem;
        letter-spacing: 2px;
      }
    }

    input {
      width: 100%;
      padding: 0.9rem 1.2rem;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.8rem;
      color: #fff;
      font-size: 1rem;
      transition: all 0.2s ease;
      &:focus {
        outline: none;
        border-color: #6366f1;
        background: rgba(99, 102, 241, 0.15);
        box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
      }
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }

    button {
      width: 100%;
      padding: 0.9rem;
      border-radius: 0.8rem;
      border: none;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
      }
    }

    span {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      text-transform: uppercase;
      a {
        color: #8b5cf6;
        font-weight: 600;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 600px) {
    form {
      padding: 2.5rem 2rem;
      .brand img {
        height: 3.2rem;
      }
      .brand h1 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Register;


