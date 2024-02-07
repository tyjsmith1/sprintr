import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavBar/MainNavBar";
function RootLayout(){
    return (
        <div className="root-layout">
            <MainNavbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout