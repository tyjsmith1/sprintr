import React from "react";
import './LoginForm.css'
import { FaUser,FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function LoginForm(){

    return (
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <NavLink to="dashboard"><button type="submit">Login</button></NavLink>
                <div className="register-link">
                    <p>Don't have an account? <NavLink to="/signup">Register</NavLink></p>

                </div>
            </form>
        </div>
    )
}

export default LoginForm