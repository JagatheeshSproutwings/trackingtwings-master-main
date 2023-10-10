import React, { useEffect, useState,useRef } from "react";
import {
  Table,
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  Polyline,
  Tooltip
} from "react-leaflet";
import L from "leaflet";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import api from "configs/apiConfig";
import { getArrowOffset } from "antd/es/style/placementArrow";
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
  const [address,setAddress] = useState([]);
  const [popupOpen, setPopupOpen] = useState(true);
  const markerRef = useRef();  
   const  getAddress = async (vehicle) =>
   {
    const latitude = vehicle?.latitude;
    const longtitude = vehicle?.longtitude;
    if(latitude>0 && longtitude>0)
    {
      const live_coordinates = {
        latitude:latitude,
        longitude:longtitude
      }
      const live_address = await api.post("live_address",live_coordinates).then((res) => { return res;}).catch((err) => {return "loading..";});
      console.log(live_address?.data?.data);
      //return live_address?.data?.data;
      const address_value = live_address?.data?.data;
      setAddress(address_value);
  
    }
  }

  useEffect(() => {
    //   const interval = setInterval(() => {
    const vehicle_data = data.map((vehicle) =>({
      id:vehicle?.id,
      title:vehicle?.title,
      last_duration:vehicle?.last_duration,
      latitude:vehicle?.latitude,
      longtitude:vehicle?.longtitude,
      speed:vehicle?.speed,
      angle:vehicle?.angle,
      icon_url:vehicle?.icon_url,
      device_time:vehicle?.device_time,
      address:getAddress(vehicle)
    }))
    setVehiclesData(vehicle_data);
    // }, 5000);
    // return () => {
    //   clearInterval(interval);
    //  };
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [data]);
  // Extract coordinates of all vehicles
  const coordinates = vehiclesData?.map((vehicle) => [
    vehicle?.latitude,
    vehicle?.longtitude,
  ]);

  // Calculate map bounds that include all markers
  const bounds = L.latLngBounds(coordinates);
  const center =
    data?.length > 0 ? [data[0].latitude, data[0].longtitude] : [20.5937, 78.9629];
  const zoom = data?.length > 0 ? 25 :4; 
  return (
    <MapContainer
      center={center}
      bounds={coordinates}
      zoom={zoom}
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
            ref={markerRef}
          >
            <Popup autoPan={false}
          closeButton={false}
          closeOnClick={false}
          closeOnEscapeKey={false}
          minWidth={200}
          open={popupOpen}>
              <p style={{ margin: 0 }}>
                <b>Vehicle Name: </b> {vehicle?.title}
              </p>
              <p style={{ margin: 0 }}>
                <b>Status: </b>
                {vehicle?.live_status} ({vehicle?.last_duration || "00:00:00"})
                HH:MM:SS{" "}
              </p>
              <p style={{ margin: 0 }}>
                <b>Speed: </b> {vehicle?.speed} KMPH
              </p>
              <p style={{ margin: 0 }}>
                <b>Last Update: </b> {vehicle?.device_time}
              </p>
              <p style={{ margin: 0 }}>
                <b>Address: {address?address:'Loading..'} </b> 
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
          <Tooltip permanent>
            <p style={{ margin: 0 }}>
              <b>Vehicle Name: </b> {vehiclesData?.title}
            </p>
            <p style={{ margin: 0 }}>
              <b>Status: </b>
              {vehiclesData?.live_status} (
              {vehiclesData?.last_duration || "00:00:00"}) HH:MM:SS{" "}
            </p>
            <p style={{ margin: 0 }}>
              <b>Speed: </b> {vehiclesData?.speed} KMPH
            </p>
            <p style={{ margin: 0 }}>
              <b>Last Update: </b> {vehiclesData?.device_time}
            </p>
            
          </Tooltip>
        </LeafletTrackingMarker>
      )}
    </MapContainer>
  );
}
