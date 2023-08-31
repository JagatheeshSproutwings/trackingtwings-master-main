import React from 'react';
import {Form,Col,Card,Space,Row,Table,Input,Button,Select} from 'antd';
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet';


const style = {
  background: '#0092ff',
  padding: '8px 0',
};

export const DefaultDashboard = () => {
  const position = [51.505, -0.09];
  // const onFinish = values => {
  //   console.log('Success:', values);
  // };
  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  
  return (
    <> 
    <Row gutter={16}>
      <Col xl={24}>
        <Card title="Map">
          <MapContainer >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Card>
      </Col>
      
    </Row>
  
    
    </>
  )
}


export default DefaultDashboard;
