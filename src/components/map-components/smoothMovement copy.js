import React, { useEffect, useState } from 'react';
import { MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline } from 'react-leaflet';
import DriftMarker from 'react-leaflet-drift-marker';
import { Table,Row,Col,List,Avatar,Badge,Skeleton } from 'antd'
import 'assets/styles/login.css'
const MapWithMovingMarker = () => {
  const [latLngData, setLatLngData] = useState([
    [51.505, -0.09],
    [52.0, -0.1],
    [51.7, -0.2],
  ]);
  const { BaseLayer } = LayersControl;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [polylinePositions, setPolylinePositions] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === latLngData.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [latLngData]);

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
      
      <DriftMarker position={latLngData[currentIndex]} keepAtCenter={true} duration={20000}>
        <Popup>
          <Row>
            <Col span={12}>
              <h6>Vehicle Name:DL01AB1234</h6>
            </Col>
          </Row>
        </Popup>
      </DriftMarker>
    </MapContainer>
    </>
    
  );
};

export default MapWithMovingMarker;
