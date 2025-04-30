import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import SetAvatar from './Components/SetAvatar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/setAvatar" element={<SetAvatar/>}/>
      <Route path="/" element={<Chat/>}/>
     </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
