import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavBar/MainNavBar";

function UserMainLayout(){
    return (
        <div className="root-layout">
            <MainNavbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default UserMainLayout