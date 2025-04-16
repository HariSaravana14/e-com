import React from 'react';
import '../styles/ForgotPassword.css';


const ForgotPassword = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Forgot Password</h1>
                <div className="input-box">
                    <input type="email" placeholder="Enter your email" required />
                    <i className='bx bxs-envelope'></i>
                </div>
                <button type="submit" className="btn">Send Reset Link</button>
                <div className="Register-link">
                    <p>Remembered your password? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;