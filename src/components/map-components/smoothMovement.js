import React, { useEffect, useState,useRef  } from 'react';
import { MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline } from 'react-leaflet';
import DriftMarker from 'react-leaflet-drift-marker';
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { Table,Row,Col,List,Avatar,Badge,Skeleton } from 'antd'
import L from "leaflet";

const MapWithMovingMarker = () => {
  const [latLngData, setLatLngData] = useState([
    [51.505, -0.09,30],
    [52.0, -0.1,35],
    [51.7, -0.2,40],
  ]);
  const [prevPos, setPrevPos] = useState([]);
  const defaultIcon = L.icon({
    iconUrl: "/img/ICONS/GREEN/car.png",
    iconSize: [40, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
    shadowAnchor: [10, 10],
    rotationAngle:50
  });
  const mapRef = useRef(null);
  const { BaseLayer } = LayersControl;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === latLngData.length - 1 ? 0 : currentIndex + 1;
      const nextLatLng = latLngData[nextIndex];
      setCurrentIndex(nextIndex);
      const prevPos = currentIndex;
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [latLngData, currentIndex]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(latLngData[currentIndex], 13);
    }
  }, [currentIndex, latLngData]);

  return (
    <>
<MapContainer center={latLngData[0]} zoom={13} style={{ width: '100%'}}>
<LayersControl>
                                    <BaseLayer  name="OpenStreetMap">
                                        <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                    </BaseLayer>
                                    <BaseLayer checked name="Google-Street View">
                                        <TileLayer
                                            attribution="Google Maps"
                                            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                                            />
                                    </BaseLayer>
                                    <BaseLayer checked name="Google-Satelite">
                                    <TileLayer
                                            url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                                            maxZoom= {20}
                                            subdomains={['mt1','mt2','mt3']}
                                        />
                                    </BaseLayer>
                                </LayersControl>
                                {/* <Marker position={latLngData[currentIndex]} icon={defaultIcon} keepAtCenter={true} rotationAngle="40">
                                <Popup>
          <Row>
            <Col span={12}>
              <h6>Vehicle Name:DL01AB1234</h6>
            </Col>
          </Row>
        </Popup>
                                </Marker> */}
                                {/* <LeafletTrackingMarker
      icon={defaultIcon}
      position={latLngData[currentIndex]}
      previousPosition={latLngData[currentIndex]-1}
      duration={1000}
    >
      <Popup>{"Hello, there! 🐱‍🏍 "}</Popup>
    </LeafletTrackingMarker> */}
      <DriftMarker position={latLngData[currentIndex]} icon={defaultIcon} rotationAngle={50}  keepAtCenter={true} duration={20000}>
        <Popup>
          <p style={{margin:0}}>Vehicle Name:DL09AD8989</p>
          <p style={{margin:0}}>Speed:30KMPH</p>
          <p style={{margin:0}}>Last Updated:2023-09-12 18:54:00</p>
          <p style={{margin:0}}>Since:05:30:00</p>
          <p style={{margin:0}}>Since:05:30:00</p>
          <p style={{margin:0}}>Since:05:30:00</p>
        </Popup>
      </DriftMarker>

      
    </MapContainer>
    </>
    
  );
};

export default MapWithMovingMarker;
