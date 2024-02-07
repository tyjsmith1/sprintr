import React, { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";

//imported components
import LoginForm from "./LoginForm/LoginForm";
import SignUp from "./SignUp/SignUp";
import About from "./About/About";
import "../index.css";
import UserMain from "./UserMain/UserMain";


//Imported Layouts
import RootLayout from "../layouts/RootLayout";
import UserMainLayout from "../layouts/UserMainLayout"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginForm />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/dashboard" element={<UserMain />}/>
          <Route index element={<Navigate to="/hey" />}/>
          <Route path="/dashboard" element={<UserMain />}/>
    </Route>
    )
  )

  return (

      // <main>
      //   <LoginNavbar/>
      //   <div className="login-div">
      //   </div>
      // </main>
      <RouterProvider router={router}/>

  )
}

export default App;
