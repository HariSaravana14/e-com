import React from 'react';
import '../styles/LoginPage.css';
// Import the updated CSS file

const LoginPage = () => {
    return (
        <div className="login-wrapper">
            <form>
                <h1>Login</h1>
                <div className="login-input-box">
                    <input type="text" placeholder="Username" required />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="login-input-box">
                    <input type="password" placeholder="Password" required />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="login-remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
                <button type="submit" className="login-btn">Login</button>
                <div className="login-register-link">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
