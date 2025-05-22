// components/MyGoogleMap.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

const MyGoogleMap: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={"AIzaSyBLz6tMkXi6xupaVe-bO0BVRPqNorMZqFw"}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyGoogleMap;
