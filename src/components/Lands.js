import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../api";
import { Link } from "react-router-dom";

function Lands () {
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
                    throw new Error("Failed to fetch lands");
                }
                const landsData = await response.json();
                setLands(landsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLands();

    }, []);

    return (
        <div>
            <h2>Lands</h2>
            <ul>
                {lands.map((land) => (
                <li key={land.id}>
                    <div>Name: {land.name}</div>
                    <div>Landmark: {land.landmark}</div>
                    <div>
                        Coordinates: 
                        <ul>
                            {land.coordinates && typeof land.coordinates === 'object' && Object.keys(land.coordinates).length > 0 ? (
                                Object.entries(land.coordinates).map(([key, value]) => (
                                    <li key={key}>
                                        Latitude: {value.latitude}, Longitude: {value.longitude}
                                    </li>
                                ))
                            ) : (
                                <li>No coordinates available</li>
                            )}
                        </ul>
                    </div>
                    <div>Area: {land.area}</div>
                    <Link to={`/map/${land.id}`}>
                        <button>View Map</button>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Lands;