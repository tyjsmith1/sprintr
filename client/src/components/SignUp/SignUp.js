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

    function validateFormInput(){

        let inputError = false

        const errors = {
            username: "",
            password: "",
            confirmPassword: ""
        }
        
        if (!signupFormData.username){
            errors.username = "Enter a valid username"
            inputError = true
        }
        
        if (!signupFormData.password){
            errors.password = "Password cannot be empty"
            inputError = true
        } else if (signupFormData.password !== signupFormData.confirmPassword) {
            errors.confirmPassword = "Password and confirm password should match"
            inputError = true
        }

        setSignupFormError(errors)

        return !inputError
    }


    function handleSubmit(e){
        e.preventDefault()
        const isValid = validateFormInput()
        if(isValid) {
            console.log("is valid!")
            setSignupFormData({
                username: '',
                password: '',
                confirmPassword: '',
                successMsg: "Success! Your account has been created."
            });
        } else {
            console.log("is not valid!")
        }      
    }

    

    function handleFormChange(e){
        const { name, value } = e.target
        setSignupFormData(prevState => ({
            ...prevState,
            [name]: value,
            successMsg: ''
        }))
    }
    

    return (
        <div className="outside">
            <div className="wrapper">
                <form action="" onSubmit={handleSubmit}>
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