import { useEffect, useState } from "react";
import { MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline } from 'react-leaflet';
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";


const defaultIcon = L.icon({
    iconUrl: "/img/ICONS/GREEN/car.png",
    iconSize: [40, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
    shadowAnchor: [10, 10],
  });

export default function AirplaneMarker({ data }) {
  const { lat, lng } = data;
  const [prevPos, setPrevPos] = useState([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <LeafletTrackingMarker
      icon={defaultIcon}
      position={[lat, lng]}
      previousPosition={prevPos}
      duration={1000}
    >
      <Popup>{"Hello, there! 🐱‍🏍 "}</Popup>
    </LeafletTrackingMarker>
  );
}
