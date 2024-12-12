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

        // Hardcoded credentials
        const validEmail = 'admin@gmail.com';
        const validPassword = 'admin';

        // Check if the input matches the hardcoded credentials
        if (email === validEmail && password === validPassword) {
            // Handle successful login (example: redirect or update state)
            console.log('Login successful');
            // Example: navigate to a different page after successful login
            navigate('/article');  // Uncomment if using react-router-dom for navigation
        } else {
            // Handle invalid credentials
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
