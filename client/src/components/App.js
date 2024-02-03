import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <div className="login-div">
        <LoginForm/>
      </div>
    </div>

  )
}

export default App;
