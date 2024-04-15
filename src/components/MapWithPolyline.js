import React, { useEffect, useRef } from 'react';

function MapWithPolyline({ coordinates }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || !window.google) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 10,
        });

        let points = [];
        if (Array.isArray(coordinates)) {
            points = coordinates.map(coord => ({
                lat: parseFloat(coord.latitude),
                lng: parseFloat(coord.longitude),
            }));
        } else if (coordinates && coordinates.length > 0 && coordinates[0].latitude !== undefined && coordinates[0].longitude !== undefined) {
            points = coordinates.map(coord => ({
                lat: parseFloat(coord.latitude),
                lng: parseFloat(coord.longitude),
            }));
        } else {
            console.error('Invalid coordinates format:', coordinates);
            return;
        }

        const polyline = new window.google.maps.Polyline({
            path: points,
            geodesic: true,
            strokeColor: '#00FF00',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        polyline.setMap(map);

        const bounds = new window.google.maps.LatLngBounds();
        points.forEach(point => bounds.extend(point));
        map.fitBounds(bounds);
    }, [coordinates]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapWithPolyline;