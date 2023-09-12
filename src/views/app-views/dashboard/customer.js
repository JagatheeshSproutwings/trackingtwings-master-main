import React, { useState } from 'react'
import {Form,Row,Col,Card,Table,Select,Input,Badge,Avatar,Divider,Tabs, List } from 'antd'
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline} from 'react-leaflet'
import { WHITE } from 'constants/ThemeConstant'
import { Sticky, StickyContainer } from 'react-sticky';
import AllVehicles from 'components/map-components/allVehicles';
import IdleVehicles from 'components/map-components/idleVehicles';
import MovingVehicles from 'components/map-components/movingVehicles';
import ParkingVehicles from 'components/map-components/parkingVehicles';
import NoNetworkVehicles from 'components/map-components/noNetworkVehicles';
import ExpiryVehicles from 'components/map-components/expiryVehicles';
const { Option } = Select

export const Customer = () => {
    // const mapStyle = {
    //     width: '100%',
    //     height: '100vh',
    //     position: 'relative',
    //   };
    //   const tabViewStyle = {
    //     position: 'absolute',
    //     top: '10px',
    //     left: '10px',
    //     backgroundColor: 'white',
    //     padding: '10px',
    //     zIndex: 1000,
    //     pointerEvents: 'auto'
    // };
    const center = [51.505, -0.09]
    const polyline = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
      ]
      const limeOptions = { color: 'lime' }
    const { BaseLayer } = LayersControl;
    const tableColumns = [
        {
            title: 'Vehicle No.',
            dataIndex: 'vehicle_no',
            key: 'vehicle_no',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
    ];
    const handleChange = (values) =>{
        console.log(values);
    }
    
return(
    <>
        <Row style={{height:'600','margin':'0','padding':'0'}}>
            <Col xs={24} sm={24} md={24} lg={24} style={{padding:0,margin:0}}>
                <Row gutter={6} style={{padding:0,margin:0}}>
                    <Col sm={12} md={6} lg={6}  style={{padding:0,margin:0}}>
                    <Form name="customer-form" layout="inline" size="small">
                            <Col xs={12}>
                            <Form.Item name="dealer_id" size="small" rules={[{required:true,message:'Dealer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Dealer/Reseller">
                                    <Option value="1" selected>Acute</Option>
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col xs={12}>
                            <Form.Item name="customer_id" size="small" rules={[{required:true,message:'Customer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Customer">
                                    <Option value="1">Customer 1</Option>
                                    <Option value="2">Customer 2</Option>
                                    <Option value="3">Customer 3</Option>
                                    <Option value="4">Customer 4</Option>
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col xs={12}>
                            <Form.Item name="dealer_id"  rules={[{required:true,message:'Dealer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Dealer/Reseller">
                                    <Option value="1" selected>Acute</Option>
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col xs={12}>
                            <Form.Item name="customer_id"  rules={[{required:true,message:'Customer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Customer">
                                    <Option value="1">Customer 1</Option>
                                    <Option value="2">Customer 2</Option>
                                    <Option value="3">Customer 3</Option>
                                    <Option value="4">Customer 4</Option>
                                </Select>
                            </Form.Item>
                            </Col>
                        </Form>
                        <Card style={{padding:0,margin:0}}>
                            <StickyContainer style={{padding:0,margin:0}}>
                                <Tabs defaultActiveKey="1"  items={[
                                        {
                                            label: `All`,
                                            key: '1',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `Moving`,
                                            key: '2',
                                            children: <MovingVehicles/>,
                                        },
                                        {
                                            label: `Idle`,
                                            key: '3',
                                            children: <IdleVehicles/>,
                                        },
                                        {
                                            label: `Parking`,
                                            key: '4',
                                            children: <ParkingVehicles/>,
                                        },
                                        {
                                            label: `OOC`,
                                            key: '5',
                                            children: <NoNetworkVehicles/>,
                                        },
                                        {
                                            label: `Expired`,
                                            key: '6',
                                            children: <ExpiryVehicles/>,
                                        },
                                    ]} />
                            </StickyContainer>
                        </Card>
                    </Col>
                    <Col sm={12} md={18} lg={18} style={{padding:0}}>
                        <Card  style={{height:'600'}}>
                            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
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

                                <Marker position={center}>
                                    <Popup>
                                        <Card size="small" style={{background:"lightblue"}} >
                                            <Row>
                                                <Col>
                                                <div>Vehicle No: TN01AB1234</div>
                                            <div>Status: MOVING</div>
                                            <div>Speed: 30 km/hr</div>
                                            <div>Battery: 25.86 volt</div>
                                            <div>Last Updated on: 2023-08-02 13:56:47</div>
                                            <div>Lat/Long: 10.7920,79.5656</div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Popup>
                                </Marker>

                                <Polyline pathOptions={limeOptions} positions={polyline} />
                            </MapContainer>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
         {/* <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
                <Row gutter={6} style={{padding:0,margin:0}}>
                    <Col sm={12} md={5} lg={5}>
                    <StickyContainer style={{padding:0,margin:0}}>
                                <Tabs defaultActiveKey="1" size='small' style={{fontSize:'10px'}}  items={[
                                        {
                                            label: `All`,
                                            key: '1',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `Moving`,
                                            key: '2',
                                            children: <MovingVehicles/>,
                                        },
                                        {
                                            label: `Idle`,
                                            key: '3',
                                            children: <IdleVehicles/>,
                                        },
                                        {
                                            label: `Parking`,
                                            key: '4',
                                            children: <ParkingVehicles/>,
                                        },
                                        {
                                            label: `OOC`,
                                            key: '5',
                                            children: <NoNetworkVehicles/>,
                                        },
                                        {
                                            label: `Expired`,
                                            key: '6',
                                            children: <ExpiryVehicles/>,
                                        },
                                    ]} />
                            </StickyContainer>
                    </Col>
                    <Col sm={12} md={19} lg={19}>
                    <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
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

                                <Marker position={center}>
                                    <Popup>
                                        <Card size="small" style={{background:"lightblue"}} >
                                            <Row>
                                                <Col>
                                                <div>Vehicle No: TN01AB1234</div>
                                            <div>Status: MOVING</div>
                                            <div>Speed: 30 km/hr</div>
                                            <div>Battery: 25.86 volt</div>
                                            <div>Last Updated on: 2023-08-02 13:56:47</div>
                                            <div>Lat/Long: 10.7920,79.5656</div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Popup>
                                </Marker>

                                <Polyline pathOptions={limeOptions} positions={polyline} />
                            </MapContainer>
                    </Col>
                </Row>
            </Col> 
        </Row>                           */}
        {/* <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
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
                                <div style={tabViewStyle}>
                                <StickyContainer style={{padding:0,margin:0}}>
                                <Tabs defaultActiveKey="1"  items={[
                                        {
                                            label: `All`,
                                            key: '1',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `Moving`,
                                            key: '2',
                                            children: <MovingVehicles/>,
                                        },
                                        {
                                            label: `Idle`,
                                            key: '3',
                                            children: <IdleVehicles/>,
                                        },
                                        {
                                            label: `Parking`,
                                            key: '4',
                                            children: <ParkingVehicles/>,
                                        },
                                        {
                                            label: `OOC`,
                                            key: '5',
                                            children: <NoNetworkVehicles/>,
                                        },
                                        {
                                            label: `Expired`,
                                            key: '6',
                                            children: <ExpiryVehicles/>,
                                        },
                                    ]} />
                            </StickyContainer>
                </div>
        </MapContainer> */}
    </>
)
}

export default Customer;