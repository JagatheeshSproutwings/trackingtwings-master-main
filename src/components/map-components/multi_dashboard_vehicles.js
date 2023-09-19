import React, { useState,useEffect } from 'react'
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline,Tooltip} from 'react-leaflet'
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE,RED_BASE,ORANGE_BASE } from 'constants/ThemeConstant';
import {Card,Tabs} from 'antd'
import api from 'configs/apiConfig'
import L from 'leaflet';
function MultiDashboardVehicles({data}) {
    const center = [20.5937, 78.9629];
    const { BaseLayer } = LayersControl;
    const [bounds,setBounds] = useState("");
    const [multiplevehiclesData,setMultiplevehiclesData] = useState(data);
    
    
    useEffect(()=>{
        
        if (data.length > 0) {
            const bounds = data.map((vehicle_data) =>
              L.latLng(vehicle_data.latitude, vehicle_data.longitude)
            );
            
        }
        const boundsObject = L.latLngBounds(bounds);
        console.log(bounds);
        setBounds(boundsObject);
          const interval = setInterval(() => {
            setMultiplevehiclesData(data);
        }, 5000);
        return () => {
          clearInterval(interval);
         };
      },[])
      
    
    const vehicle_color = (value) => {
        console.log(value);
        switch (value) {
          case 1:
            return  BLUE_BASE;
            break;
          case 2:
            return GOLD_BASE;
            break;
          case 3:
            return GREEN_BASE;
            break;
            case 4:
              return RED_BASE;
            break;
            case 5:
              return GRAY_DARK;
            break;
            case 6:
              return ORANGE_BASE;
            break;
          default:
            return GRAY_DARK;
            break;
        }
    
      }

    const vehicle_icon = (icon) => {
        console.log(icon);
    }
  return (
    <>
    
    <MapContainer center={center} bounds={bounds} zoom={5} style={{ width: '100%'}}>
        <LayersControl>
            <BaseLayer  checked name="OpenStreetMap">
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
            <BaseLayer  name="Google-Satelite">
            <TileLayer
                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxZoom= {20}
                    subdomains={['mt1','mt2','mt3']}
                />
            </BaseLayer>
        </LayersControl>

        {data?.map((marker) => (
              <Marker key={marker.id} position={[marker?.latitude, marker?.longtitude]} keepCenter={true}>
                <Popup>
                <p style={{margin:0}}><b>Vehicle Name: </b>  {marker?.title}</p>
                <p style={{margin:0}}><b>Status: </b>{marker?.live_status} ({marker?.last_duration||"00:00:00"}) </p>
                <p style={{margin:0}}><b>Speed: </b> {marker?.speed} KMPH</p>
                <p style={{margin:0}}><b>Last Update: </b> {marker?.device_time}</p>
                </Popup>
                <Tooltip  permanent><b>{marker?.title}</b>  </Tooltip>
              </Marker>
            ))
          }
            
    </MapContainer>
    
    </>
  )
}

export default MultiDashboardVehicles