import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl, Popup } from "react-leaflet";
import L from "leaflet";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

// Create a function to dynamically generate icons based on the iconUrl
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

  // Extract coordinates of all vehicles
  const coordinates = vehiclesData?.map((vehicle) => [
    vehicle?.latitude,
    vehicle?.longtitude,
  ]);

  // Calculate map bounds that include all markers
  const center =
    data?.length > 0
      ? [data[0].latitude, data[0].longtitude]
      : [11.0168, 76.9558];
  return (
    <MapContainer
      center={center}
      bounds={coordinates}
      zoom={25}
      style={{ height: "500px", width: "100%" }}
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
        vehiclesData?.map((vehicle) => (
          <LeafletTrackingMarker
            key={vehicle?.id}
            position={[vehicle?.latitude || 0.0, vehicle?.longtitude || 0.0]}
            duration={2000}
            rotationAngle={vehicle?.angle}
            icon={createIcon(vehicle?.icon_url)}
            keepAtCenter={true}
          >
            <Popup>
              <p style={{ margin: 0 }}>
                <b>Vehicle Name: </b> {vehicle?.title}
              </p>
              <p style={{ margin: 0 }}>
                <b>Speed: </b> {vehicle?.speed} KMPH
              </p>
              <p style={{ margin: 0 }}>
                <b>Last Update: </b> {vehicle?.device_time}
              </p>
            </Popup>
          </LeafletTrackingMarker>
        ))
      ) : (
        <LeafletTrackingMarker
          key={vehiclesData?.id}
          position={[vehiclesData?.latitude, vehiclesData?.longtitude]}
          duration={5000}
          rotationAngle={vehiclesData?.angle}
          icon={createIcon(vehiclesData?.icon_url)}
          keepAtCenter={true}
        >
          <Popup>
            <p style={{ margin: 0 }}>
              <b>Vehicle Name: </b> {vehiclesData?.title}
            </p>
            <p style={{ margin: 0 }}>
              <b>Speed: </b> {vehiclesData?.speed} KMPH
            </p>
            <p style={{ margin: 0 }}>
              <b>Last Update: </b> {vehiclesData?.device_time}
            </p>
          </Popup>
        </LeafletTrackingMarker>
      )}
    </MapContainer>
  );
}
