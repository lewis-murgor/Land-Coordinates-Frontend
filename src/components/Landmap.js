import React, { useState, useEffect } from 'react';
import MapWithPolyline from './MapWithPolyline';
import { ENDPOINTS } from '../api';

function Landmap () {
    const [lands, setLands] = useState([]);

    useEffect(() => {
        const fetchLands = async () => {
            try {
                const response = await fetch(ENDPOINTS.LANDS, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch land data');
                }
                const data = await response.json();
                console.log(data)
                setLands(data);
            } catch (error) {
                console.error('Error fetching land data:', error);
            }
        };

        fetchLands();
    }, []);

    return (
        <div>
            {lands.map((land) => (
                <div key={land.id}>
                    <h2>{land.name}</h2>
                    <MapWithPolyline coordinates={land.coordinates} />
                </div>
            ))}
        </div>
    );
};

export default Landmap;