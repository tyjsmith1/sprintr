import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar/LoginNavbar"

function RootLayout(){
    return (
        <div className="root-layout">
            <LoginNavbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout