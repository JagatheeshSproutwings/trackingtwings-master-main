import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl, Popup } from "react-leaflet";
import L from "leaflet";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

function createIcon(iconUrl) {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
  });
}

export default function VehicleMarker({ data }) {
  const [vehiclesData, setVehiclesData] = useState(data || []);

  useEffect(() => {
    setVehiclesData(data);
  }, [data]);

  const coordinates = [data?.latitude, data?.longitude];
  const center = [data?.latitude, data?.longitude];

  return (
    <MapContainer
      center={center}
      bounds={coordinates}
      zoom={25} // Adjust the zoom level as needed
      style={{ height: "400px", width: "100%" }} // Adjust the height as needed
    >
      <LayersControl>
        <LayersControl.BaseLayer checked name="Google-Street View">
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Google-Satelite">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {Array.isArray(vehiclesData) ? (
        vehiclesData?.map((vehicle, index) => (
          <LeafletTrackingMarker
            key={index}
            position={[vehicle?.latitude || 0.0, vehicle?.longitude || 0.0]}
            duration={2000}
            icon={createIcon(vehicle?.icon_url)}
            keepAtCenter={true}
          >
            <Popup>
              <p style={{ margin: 0 }}>
                <b>Vehicle Name: </b> {vehicle?.title}
              </p>
              <p style={{ margin: 0 }}>
                <b>Duration: </b> {vehicle?.duration}
              </p>
            </Popup>
          </LeafletTrackingMarker>
        ))
      ) : (
        <LeafletTrackingMarker
          key={vehiclesData?.id}
          position={[vehiclesData?.latitude, vehiclesData?.longitude]}
          duration={5000}
          icon={createIcon(vehiclesData?.icon_url)}
          keepAtCenter={true}
        >
          <Popup>
            <p style={{ margin: 0 }}>
              <b>Vehicle Name: </b> {vehiclesData?.title}
            </p>
            <p style={{ margin: 0 }}>
              <b>Duration: </b> {vehiclesData?.duration}
            </p>
            <p style={{ margin: 0 }}>
              <b>Device Time: </b> {vehiclesData?.device_time}
            </p>
          </Popup>
        </LeafletTrackingMarker>
      )}
    </MapContainer>
  );
}
