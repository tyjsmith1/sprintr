import React, { useState } from "react";
import { FaUser,FaLock, FaKey } from "react-icons/fa";
import './SignUp.css'

function SignUp() {

    const [signupFormData, setSignupFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        successMsg: ''
    })
    
    const [signupFormError, setSignupFormError] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    function validateFormInput(e){
        e.preventDefault()
        console.log("submitted")

        let inputError = {
            username: "",
            password: "",
            confirmPassword: ""
        }

        if (!signupFormData.email && !signupFormData.password) {
            setSignupFormError({
                ...inputError,
                username: "Enter a valid username",
                password: "Password should not be empty"
            })
            return
        }
    }

    function handleFormChange(e){
        const { name, value } = e.target
        setSignupFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="outside">
            <div className="wrapper">
                <form action="" onSubmit={validateFormInput}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input 
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={signupFormData.username}
                            onChange={handleFormChange}
                        />
                        <FaUser className="icon"/>
                        <p className="error-message">{signupFormError.username}</p>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signupFormData.password}
                            onChange={handleFormChange}
                        />
                        <FaLock className="icon"/>
                        <p className="error-message">{signupFormError.password}</p>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={signupFormData.confirmPassword}
                            onChange={handleFormChange}
                        />
                        <FaKey className="icon"/>
                        <p className="error-message">{signupFormError.confirmPassword}</p>
                        <p className="success-message">{signupFormData.successMsg}</p>
                    </div>
                    <button type="submit">Get Started!</button>
                </form>
            </div>
        </div>

    )
}

export default SignUp