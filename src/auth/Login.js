import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api';
import './auth.css';

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
                const username = data.username;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
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
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <div className='card auth'>
                        <div className='card-header auth-head'><h2>Login</h2></div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text"
                                    placeholder="Username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <br />
                                <input 
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br /><br />
                                <button className='btn btn-primary btn-md auth-button' type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'></div>
            </div>
            
        </div>
    );
};

export default Login;