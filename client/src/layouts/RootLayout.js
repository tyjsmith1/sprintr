import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar/LoginNavbar"
import { useTheme } from "../components/ThemeContext"
import { FaSun, FaMoon } from 'react-icons/fa';
import '../index.css'

function RootLayout(){
    const { theme, toggleTheme } = useTheme()
    return (
        <div className={theme}>
            <button className="theme-toggle-btn fab-position" onClick={toggleTheme}>
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <div className="root-layout">
                <LoginNavbar/>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default RootLayout