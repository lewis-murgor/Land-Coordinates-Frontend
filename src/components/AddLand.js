import React, { useState } from "react";
import { ENDPOINTS } from "../api";
import "./addLand.css";

function AddLand () {
    const [formData, setFormData] = useState({
        name: '',
        coordinates: [],
        landmark: '',
        latitude: '',
        longitude: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddCoordinate = () => {
        const { latitude, longitude } = formData;
        if (latitude && longitude) {
            setFormData({
                ...formData,
                coordinates: [
                  ...formData.coordinates,
                  { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
                ],
                latitude: '',
                longitude: '',
            });
        } else {
            setFormData({
                ...formData,
                error: 'Latitude and Longitude are required.',
            });
        }
    };

    const handleRemoveCoordinate = (index) => {
        const updatedCoordinates = [...formData.coordinates];
        updatedCoordinates.splice(index, 1);
        setFormData({
            ...formData,
            coordinates: updatedCoordinates,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(ENDPOINTS.LANDS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add land');
            }

            const data = await response.json();
            console.log('Land added successfully:', data);

            setFormData({
                name: '',
                coordinates: [],
                landmark: '',
                latitude: '',
                longitude: '',
                error: null,
            });
        } catch (error) {
            console.error('Error adding land:', error);
        }
    };

    return (
        <div className="container addLand">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className='card add-land'>
                        <div className="card-header add-land-head"><h2>Add Land</h2></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control" 
                                    placeholder="Name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                />
                                <br />

                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Latitude" 
                                    name="latitude" 
                                    value={formData.latitude} 
                                    onChange={handleChange} 
                                />
                                <br />
                    
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Longitude" 
                                    name="longitude" 
                                    value={formData.longitude} 
                                    onChange={handleChange} 
                                />
                                <br />
                                <button type="button" className="btn btn-primary btn-md" onClick={handleAddCoordinate}>
                                    Add Coordinate
                                </button>

                                {formData.error && (
                                    <div style={{ color: 'red' }}>{formData.error}</div>
                                )}

                                <ul>
                                    {formData.coordinates.map((coord, index) => (
                                        <li key={index}>
                                            {`Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`}
                                            <button type="button" onClick={() => handleRemoveCoordinate(index)}>
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Landmark" 
                                    name="landmark" 
                                    value={formData.landmark} 
                                    onChange={handleChange} 
                                />
                                <br />

                                <button type="submit" className="btn btn-primary btn-md">Add Land</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
};

export default AddLand;