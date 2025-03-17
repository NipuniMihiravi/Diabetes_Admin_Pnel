import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

      const navigate = useNavigate();  // Initialize navigate

    const handleSubmit = (e) => {
        e.preventDefault();

        const validEmail = 'admin@gmail.com';
        const validPassword = 'admin';

        if (email === validEmail && password === validPassword) {
            // Store user session in sessionStorage
            const userData = { email };
            sessionStorage.setItem("user", JSON.stringify(userData));

            console.log('Login successful');
            navigate('/article'); // Redirect to the article page
        } else {
            setError('Invalid credentials');
        }
    };


    return (
        <div className="login-form-container">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" className="logo" />
            <h2>Admin Panel Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
