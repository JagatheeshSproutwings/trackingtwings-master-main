import React from 'react'
import {Row,Col,Card} from 'antd'
import {
    MapContainer,
    TileLayer,
    LayersControl,
    Marker,
    Popup,
  } from "react-leaflet"
  import ReactApexChart from 'react-apexcharts';
  import { apexSparklineChartDefultOption, COLORS } from 'constants/ChartConstant';
  import L from "leaflet";
function MultiDashboard() {
    const center = [51.505, -0.09];
    const chartOptions = {
        chart: {
          type: 'donut',
        },
        labels: ['Apples', 'Bananas', 'Cherries'],
        series: [44, 55, 13],
      };
    
  return (
    <div>
        <Row gutter={5}>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>All</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>Parking</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>Idle</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>Moving</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>No Data</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>Inactive</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>Expired</p><p style={{margin:'0px'}}>100</p></Card></Col>
        <Col md={3} style={{textAlign:'center',margin:'0px'}}><Card size='small' bordered={true}><p style={{margin:'0px'}}>Expiry Soon</p><p style={{margin:'0px'}}>100</p></Card></Col>
        </Row>
        <Row gutter={5}>
            <Col md={18}>
            <MapContainer center={center}  zoom={4} style={{ height: '300px', width: '100%' }}>
      <LayersControl>
      <LayersControl.BaseLayer checked name="Google-Street View">
        <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                    />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer  name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.BaseLayer  name="Google-Satelite">
        <TileLayer
                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxZoom= {20}
                    subdomains={['mt1','mt2','mt3']}
                />
        </LayersControl.BaseLayer>
      </LayersControl>
      
    </MapContainer>
            </Col>
            <Col md={6}>
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" />
            </Col>
        </Row>
    </div>
  )
}

export default MultiDashboard