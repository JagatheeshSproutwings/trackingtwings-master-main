import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer,Popup } from "react-leaflet";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";

// Define a custom marker icon with rotation
const customIcon = new L.Icon({
  iconUrl: "/img/ICONS/GREEN/car.png",
  iconSize: [40, 40],
  iconAnchor: [18, 18],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
  className: "custom-icon", // Add a custom CSS class
});

export default function AirplaneMarker() {
  const [position, setPosition] = useState([53.22376666666667, 50.745841666666664]);
  const [prevPos, setPrevPos] = useState([53.22376666666667, 50.745841666666664]);
  const [rotationAngle, setRotationAngle] = useState(0); // Initial rotation angle

  const sampleData = [
    {
      lat: 53.22376666666667,
      lng: 50.745841666666664,
      angle: 20,
    },
    {
      lat: 53.223728333333334,
      lng: 50.74598666666667,
      angle: 35,
    },
    {
      lat: 53.22365166666667,
      lng: 50.746075,
      angle:40
    },
    {
        lat: 53.22265166666667,
        lng: 50.7470,
        angle:45
      },
      {
        lat: 53.23265166666667,
        lng: 50.7500,
        angle:50
      },
      {
        lat: 53.24265166666667,
        lng: 50.7570,
        angle:55
      },
  ];

  useEffect(() => {
    let currentIndex = 0;

    const moveMarker = () => {
      if (currentIndex < sampleData.length) {
        const { lat, lng, angle } = sampleData[currentIndex];
        setPosition([lat, lng]);
        setPrevPos([lat, lng]);
        setRotationAngle(angle || 0); // Set the rotation angle
        currentIndex += 1;
      }
    };

    const interval = setInterval(moveMarker, 1000); // Update every 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LeafletTrackingMarker
          icon={customIcon} // Use the custom icon with rotation
          position={position}
          previousPosition={prevPos}
          duration={10000}
          keepAtCenter={true}
          rotationAngle={rotationAngle} // Pass the rotation angle
        ><Popup><p style={{margin:0}}>Vehicle Name:TN01DC9898</p><p style={{margin:0}}>Speed:30KMPH</p><p style={{margin:0}}>Last Update:2023-09-03 09:00:00</p></Popup></LeafletTrackingMarker>
      </MapContainer>
    </div>
  );
}
