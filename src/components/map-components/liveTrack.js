import { useEffect, useState } from "react";
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline} from 'react-leaflet'
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "/img/ICONS/GREEN/car.png",
  iconSize: [40, 40],
  iconAnchor: [18, 18],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
  rotationAngle:50
});

export default function AirplaneMarker() {
  const { lat, lng } = useState();
  const { BaseLayer } = LayersControl;
  const [prevPos, setPrevPos] = useState([lat, lng]);
  const dataStory = [
    {
      lat: 53.22376666666667,
      lng: 50.745841666666664,
      angle:20,
    },
    {
      lat: 53.22376666666667,
      lng: 50.745841666666664,
      angle:30,
    },
    {
      lat: 53.223728333333334,
      lng: 50.74598666666667,
      angle:35
    },
    {
      lat: 53.223705,
      lng: 50.746021666666664
    },
    {
      lat: 53.22365166666667,
      lng: 50.746075
    }
  ];
  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) 
    setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <>
    <MapContainer  zoom={13} scrollWheelZoom={true}>
              <LayersControl>
                <BaseLayer checked name="OpenStreetMap">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </BaseLayer>
                <BaseLayer name="Google-Street View">
                  <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                  />
                </BaseLayer>
                <BaseLayer checked name="Google-Satelite">
                  <TileLayer
                    url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt1", "mt2", "mt3"]}
                  />
                </BaseLayer>
            </LayersControl>
            <LeafletTrackingMarker
        icon={defaultIcon}
        position={[lat, lng]}
        previousPosition={prevPos}
        duration={1000}
        keepAtCenter={true}
      ></LeafletTrackingMarker>
          </MapContainer>
          
    </>
  );
}
