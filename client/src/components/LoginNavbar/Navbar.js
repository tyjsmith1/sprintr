import React from "react";
import './Navbar.css'

function Navbar(){
    return (
        <div className="navbar-container">
            <div className="nav-logo-div">
                <h1 className="nav-logo">sprintr.</h1>
            </div>
            <div className="nav-option-div">
                <ul className="nav-option-ul">
                    <li>
                        <a className="nav-options">About</a>
                    </li>
                    <li>
                        <a className="nav-options">Sign Up</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;