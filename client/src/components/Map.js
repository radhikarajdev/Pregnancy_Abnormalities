import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import your custom hospital icon image
import hospitalIcon from './location2.png'; // Replace with the path to your image
import locationIcon from './location.png'; // Replace with the path to your location image

const Map = () => {
    const [hospitals, setHospitals] = useState([]);
    const [position, setPosition] = useState([51.505, -0.09]); // Default position

    // Create a custom icon for the user's location
    const userLocationIcon = new L.Icon({
        iconUrl: locationIcon, // Custom icon URL for user location
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // Optional shadow
    });

    // Create a custom icon for hospitals
    const hospitalMarkerIcon = new L.Icon({
        iconUrl: hospitalIcon, // Custom icon URL for hospitals
        iconSize: [30, 30], // Size of the hospital icon (adjust as necessary)
        iconAnchor: [15, 30], // Adjust anchor for the hospital icon
        popupAnchor: [0, -30], // Adjust popup position for the hospital icon
    });

    // Function to fetch hospitals near a dynamic location
    const fetchHospitals = async (lat, lon) => {
        const radius = 5000; // Search radius in meters
        try {
            const response = await axios.get(
                `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"](around:${radius},${lat},${lon}););out;`
            );
            setHospitals(response.data.elements);
        } catch (error) {
            console.error("Error fetching hospitals: ", error);
        }
    };

    // Custom hook to handle map clicks and update position
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                fetchHospitals(lat, lng);
            }
        });

        return position === null ? null : (
            <Marker position={position} icon={userLocationIcon}>
                <Popup>Selected Location</Popup>
            </Marker>
        );
    };

    // Get user's current location when the component mounts
    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setPosition([latitude, longitude]);
                        fetchHospitals(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error fetching location: ", error);
                    }
                );
            }
        };

        getCurrentLocation();
    }, []);

    return (
        <div>
            <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                {/* Display hospital markers with custom icon */}
                {hospitals.map((hospital) => (
                    <Marker key={hospital.id} position={[hospital.lat, hospital.lon]} icon={hospitalMarkerIcon}>
                        <Popup>
                            <h2 className="hospital-name">{hospital.tags?.name || "Hospital"}</h2>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
