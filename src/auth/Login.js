import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api';

function Login ({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.auth_token;
                localStorage.setItem('token', token);
                console.log('Login successful');
                setIsAuthenticated(true);
                navigate('/lands');
            } else {
                throw new Error('Login failed');
            }

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;