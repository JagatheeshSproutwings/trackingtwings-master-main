import React, { useEffect, useState,useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

function Map() {
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const mapRef = useRef(null);
  useEffect(() => {
    // Update the marker's position and rotation angle at regular intervals
    const interval = setInterval(() => {
      setMarkerPosition([markerPosition[0] + 0.04, markerPosition[1] + 0.01]);
      setRotationAngle(rotationAngle + 22);
    }, 1000);

    return () => clearInterval(interval);
  }, [markerPosition, rotationAngle]);
  useEffect(() => {
    // Calculate bounds based on the marker's position
    if (mapRef.current) {
      const bounds = L.latLngBounds(markerPosition);
      mapRef.current.leafletElement.fitBounds(bounds);
    }
  }, [markerPosition]);
  const bounds = L.latLngBounds([markerPosition]);
  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div class="custom-marker"></div>',
  });

  return (
    <MapContainer bounds={bounds} center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition}  rotationAngle={rotationAngle} />
    </MapContainer>
  );
}

export default Map;
