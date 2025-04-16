import React from 'react';
import '../styles/RegisterPage.css'; // Make sure this file is in the correct directory

const RegisterPage = () => {
    return (
        <div className="register-wrapper">
            <form action="">
                <h1>Register</h1>
                <div className="register-input-box">
                    <input type="text" placeholder="Enter your name" required />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="register-input-box">
                    <input type="email" placeholder="Enter your email" required />
                    <i className='bx bxs-envelope'></i>
                </div>
                <div className="register-input-box">
                    <input type="password" placeholder="Create a password" required />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="register-input-box">
                    <input type="password" placeholder="Confirm password" required />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" className="register-btn">Sign Up</button>
                <div className="register-login-link">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
