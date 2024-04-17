import React from "react";
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api';

function Logout({setIsAuthenticated}) {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            const response = await fetch(ENDPOINTS.LOGOUT, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('token');
                console.log('Logout successful');
                setIsAuthenticated(false);
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default Logout;