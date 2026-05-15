import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in...");
    };

    return (
        <div className="auth-container">
            <div className="auth-card" >
                <b>Welcome Back</b>
                <p className="auth-subtitle">enter your details to log in.</p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username or Email</label>
                        <input type="text" placeholder="Enter your name" required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-footer">
                    <span>Don't have an account? </span>
                    <Link to="/signin">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;