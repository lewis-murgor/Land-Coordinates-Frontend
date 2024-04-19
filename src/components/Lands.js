import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../api";
import { Link } from "react-router-dom";
import "./lands.css";

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${ENDPOINTS.LAND.replace('<int:pk>', id)}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete land");
            }

            setLands(prevLands => prevLands.filter(land => land.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const renderDeleteButton = (land) => {
        const authenticatedUsername = localStorage.getItem('username');
        if (authenticatedUsername && land.owner_username) {
            if (land.owner_username === authenticatedUsername) {
                return (
                    <button onClick={() => handleDelete(land.id)} className="btn btn-danger ml-2 delete-button">
                        Delete
                    </button>
                );
            }
            return null;
        }
    };

    return (
        <div className="container lands">
            <h2 className="head">Lands:</h2>
            <div className="row mb-4">
                {lands.map((land) => (
                    <div className="col-md-6 mb-4" key={land.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Name: {land.name}</h5>
                                <p className="card-text">Landmark: {land.landmark}</p>
                                <p className="card-text">
                                    Coordinates:
                                    <ul>
                                        {land.coordinates &&
                                        typeof land.coordinates === "object" &&
                                        Object.keys(land.coordinates).length > 0 ? (
                                            Object.entries(land.coordinates).map(([key, value]) => (
                                                <li key={key}>
                                                    Latitude: {value.latitude}, Longitude:{" "}
                                                    {value.longitude}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No coordinates available</li>
                                        )}
                                    </ul>
                                </p>
                                <p className="card-text">Area: {land.area}</p>
                                <Link to={`/map/${land.id}`} className="btn btn-primary">
                                    View Map
                                </Link>
                                {renderDeleteButton(land)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lands;