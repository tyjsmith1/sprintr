import React from "react";
import './LoginNavbar.css'
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

function Navbar(){
    return (
        <div className="navbar-container">
            <div className="nav-logo-div">
                <h1><NavLink className="nav-logo" to="/">sprintr.</NavLink></h1>
            </div>
            <div className="nav-option-div">
                <ul className="nav-option-ul">
                    <li>
                        <NavLink className="nav-options" to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-options" to="/signup">SignUp</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;