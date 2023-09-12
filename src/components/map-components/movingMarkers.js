import React,{useEffect} from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet-movingmarker';
const coordinates = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.52, -0.12],
    // Add more coordinates as needed
  ];
function MovingMarkers() {
    useEffect(() => {
        const map = L.map('map').setView(coordinates[0], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    
        const movingMarker = L.Marker.movingMarker(coordinates, [5000], {
          autostart: true,
          loop: true,
          icon: L.divIcon({ className: 'moving-marker-icon' }), // Customize the marker icon here
        }).addTo(map);
    
        // Start the marker animation
        movingMarker.start();
    
        // Clean up when the component unmounts
        return () => {
          map.remove();
        };
      }, []);
    
      return <div id="map" style={{ height: '500px' }}></div>;
}

export default MovingMarkers