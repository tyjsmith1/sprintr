import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import LoginNavbar from "./LoginNavbar/LoginNavbar";
import SignUp from "./SignUp/SignUp";
import About from "./About/About";

function App() {
  return (
    <BrowserRouter>
      <LoginNavbar/>
      <main>
        <div className="login-div">
          <Routes>
            <Route index element={<LoginForm/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App;
