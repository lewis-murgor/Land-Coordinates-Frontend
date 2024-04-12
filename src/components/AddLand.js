import React, { useState } from "react";
import { ENDPOINTS } from "../api";

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
        <div>
            <h2>Add Land</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>

                <label>
                    Latitude:
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
                </label>
                <label>
                    Longitude:
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
                </label>
                
                <button type="button" onClick={handleAddCoordinate}>
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

                <label>
                    Landmark:
                    <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
                </label>

                <button type="submit">Add Land</button>
            </form>
        </div>
    );
};

export default AddLand;