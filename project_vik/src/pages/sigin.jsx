import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
    const handleSignin = (e) => {
        e.preventDefault();
        console.log("Creating account...");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>


                <form className="auth-form" onSubmit={handleSignin}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="name " required />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="email" required />
                        </div>
                        <div className="input-group">
                            <label>Phone</label>
                            <input type="tel" placeholder="phone number" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="  password" required />
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="confirm password" required />
                    </div>

                    <button type="submit" className="auth-button">Sign Up</button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account? </span>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;