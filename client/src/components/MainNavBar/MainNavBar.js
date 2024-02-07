import React from "react";
import { NavLink } from "react-router-dom";

function MainNavbar(){
    return (
        <div className="navbar-container">
            <div className="nav-logo-div">
                <h1><NavLink className="nav-logo" to="/dashboard">sprintr.</NavLink></h1>
            </div>
            <div className="nav-option-div">
                <ul className="nav-option-ul">
                    <li>
                        <NavLink className="nav-options" to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-options" to="/">Log Out</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainNavbar