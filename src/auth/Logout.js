import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api';

function Logout () {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch(ENDPOINTS.LOGOUT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
    
                if (response.ok) {
                    localStorage.removeItem('token');
                    navigate('/login')
                } else {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        };
        logoutUser();
    }, [navigate]);

    return (
        <div>
            <h4>Logging out...</h4>
        </div>
    );
};

export default Logout;