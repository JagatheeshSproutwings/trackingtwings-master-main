import React, { useState,useEffect } from 'react'
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline} from 'react-leaflet'
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE,RED_BASE,ORANGE_BASE } from 'constants/ThemeConstant';
import {Card,Tabs} from 'antd'
import api from 'configs/apiConfig'
function MultiDashboardVehicles({data}) {
    const center = [51.505, -0.09];
    const { BaseLayer } = LayersControl;
    const [multiplevehiclesData,setMultiplevehiclesData] = useState(data);
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setMultiplevehiclesData(data);
        }, 2000);
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
    
    <MapContainer center={center} zoom={13} style={{ width: '100%'}}>
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
                <p style={{margin:0}}>Vehicle Name:{marker?.title}</p>
                <p style={{margin:0}}>Status:{marker?.live_status} </p>
                <p style={{margin:0}}>Speed:{marker?.speed} KMPH</p>
                <p style={{margin:0}}>Last Update:{marker?.device_time}</p>
                </Popup>
              </Marker>
            ))
          }
            
    </MapContainer>
    
    </>
  )
}

export default MultiDashboardVehicles