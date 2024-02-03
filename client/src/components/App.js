import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";

function App() {
  return (
    <div>
      <h1 className="logo">sprintr.</h1>
      <LoginForm/>
    </div>
  )
}

export default App;
