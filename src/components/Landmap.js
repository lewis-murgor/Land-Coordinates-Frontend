import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MapWithPolyline from './MapWithPolyline';
import { ENDPOINTS } from '../api';

function Landmap () {
    const { id } = useParams();
    const [landName, setLandName] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const fetchLandData = async () => {
            try {
                const response = await fetch(`${ENDPOINTS.LANDS}/${id}`, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch coordinates');
                }
                const landData = await response.json();
                setLandName(landData.name);
                setCoordinates(landData.coordinates);
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };

        fetchLandData();
    }, [id]);

    return (
        <div>
            <h2>Map of {landName}</h2>
            <MapWithPolyline coordinates={coordinates} />
        </div>
    );
};

export default Landmap;