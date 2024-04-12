import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../api";

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
                    {/*<div>Coordinates: {land.coordinates}</div>*/}
                    <div>Area: {land.area}</div>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Lands;