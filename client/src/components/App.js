import React, { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

//imported components
import LoginForm from "./LoginForm/LoginForm";
import SignUp from "./SignUp/SignUp";
import About from "./About/About";
import "../index.css";
import UserMain from "./UserMain/UserMain";
import SprintManagement from "./SprintManagement/SprintManagement";

//Imported Layouts
import RootLayout from "../layouts/RootLayout";
import UserMainLayout from "../layouts/UserMainLayout"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginForm />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
      </Route>,
      <Route element={<UserMainLayout />}>
          <Route path="/dashboard" element={<UserMain />}/>
          <Route path="/sprints" element={<SprintManagement />}/>
      </Route>
    </>
    )
  )

  return (
      <RouterProvider router={router}/>
  )
}

export default App;
