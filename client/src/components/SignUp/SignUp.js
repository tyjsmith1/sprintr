import React from "react";
import { FaUser,FaLock, FaKey } from "react-icons/fa";

function SignUp() {

    return (
        <div className="outside">
        <div className="wrapper">
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Confirm Password" required/>
                    <FaKey className="icon"/>
                </div>
                <button type="submit">Get Started!</button>
            </form>
        </div>
        </div>

    )
}

export default SignUp