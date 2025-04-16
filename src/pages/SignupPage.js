import React from 'react';
import '../styles/LoginPage.css'; // Ensure you have the CSS file in the same directory

const SignupPage = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" required />
                    <i className='bx bxs-envelope'></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" className="btn">Sign Up</button>
                <div className="Register-link">
                    <p>Already have an account? <a href="#">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;