import React from 'react'
import { MapContainer, TileLayer,LayersControl } from 'react-leaflet'
const singleDashboard = () => {
  const position = [11.0467, 76.9254]
    const { BaseLayer } = LayersControl;
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
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
                            url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                            maxZoom= {20}
                            subdomains={['mt1','mt2','mt3']}
                        />
                    </BaseLayer>
                </LayersControl>
      </MapContainer>
    </div>
  )
}

export default singleDashboard