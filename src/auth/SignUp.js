import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from "../api";
import './auth.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error('Sign-up failed');
            }

            navigate('/login');
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className='card auth'>
                        <div className="card-header"><h2>Sign Up</h2></div>
                        <div className="card-body">
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
                                    type="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <br />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br />
                                <input
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <br /><br />
                                <button className="btn btn-primary btn-md auth-button" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
};

export default SignUp;