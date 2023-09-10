import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-marker-rotation";

const MySimpleMap = () => {
  const [lat, setLat] = useState(22.899397);
  const [lon, setLon] = useState(89.508279);
  const [heading, setHeading] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      myfun();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lat]);

  const defaultIcon = L.icon({
    iconUrl: "/img/ICONS/GREEN/car.png",
    iconSize: [40, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
    shadowAnchor: [10, 10]
  });

  const myfun = () => {
    setLat(lat + 0.00001);
    setLon(lon + 0.00001);
    setHeading(heading);
    console.log("angle:" + heading);
  };
  return (
    <MapContainer className="map" center={[lat, lon]} zoom={21}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[lat, lon]}
        icon={defaultIcon}
        rotationAngle={heading}
        rotationOrigin="center"
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MySimpleMap;