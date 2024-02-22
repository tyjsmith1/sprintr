import React, {useState} from "react"
import './LoginForm.css'
import { FaUser,FaLock } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from '../../AuthContext';

function LoginForm(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            await login({ username, password })
            navigate('/dashboard')
        
        } catch (error) {
            alert('Login failed! Please try again.')
        }
    }

    return (
        <div>
            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)} 
                        />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <FaLock className="icon"/>
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <NavLink to="/signup">Register</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm