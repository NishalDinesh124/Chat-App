import React from 'react';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
  const navigate = useNavigate();
  // Handle the logout
  const handleLogOut = () => {
    localStorage.clear(); // Clear local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Button onClick={handleLogOut}>
      <BiPowerOff />
    </Button>
  );
}

// Keep your original button styles
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  background-color: #3126261c;
  border: none;
  border-radius: 2rem;
  color: #315f7d;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color:#b9cedf; /* Slightly darker on hover */
    transform: scale(1.05); /* Slight scale-up on hover */
  }

  svg {
    font-size: 1.5rem; /* Adjusted icon size */
    margin-right: 0.5rem; /* Space between icon and any text */
  }
`;