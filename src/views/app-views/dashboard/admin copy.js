import React, { useState,useEffect } from 'react'
import {Form,Row,Col,Card,Table,Select,Input,Badge,Avatar,Divider,Button,List} from 'antd'
import {MapContainer,TileLayer,Marker,Popup,LayersControl} from 'react-leaflet'
import { WHITE } from 'constants/ThemeConstant'
import { useSelector } from 'react-redux'
import api from 'configs/ApiConfig'
const { Option } = Select
export const Admin = () => {
    const [CustomerId,SetCustomerId] = useState("");
    const [UserDetail,SetUserDetail] = useState({});
    const [VehicleDetail,SetVehicleDetail] = useState({});
    const token = useSelector(state => state.auth);
    console.log(token);
    const position = [11.0467, 76.9254]
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
        user_list(values);

    }
    
      useEffect(()=>{
        vehicle_list();
      },[])

      const  vehicle_list = async (values) =>{
      
        const vehicle_data = await api.get("multi_dashboard");
        console.log(vehicle_data.data.data);
        SetVehicleDetail(vehicle_data.data.data);
        // SetCustomerId(user_data.data.message);
      } 
const  user_list = async (values) =>{

    const user_data = await api.get("user/show/"+values);
    console.log(user_data.data);
    SetUserDetail(user_data.data.data);
    SetCustomerId(user_data.data.message);
} 

return(
    <>
    
    <Row gutter={6} >
        <Col xs={24} sm={24} lg={6} >
            <Row gutter={6}>
                <Col sm={6} lg={24}>
                    <Card title={token?.user_info?.name}>
                        <Form name="customer-form" layout="inline">
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
                    </Card>
                </Col>
                <Col sm={6} lg={24} style={{height:'100vh'}}>
                    <Card title={CustomerId} >
                        <div className="mt-1">
                            <Row gutter={2}> 
                                <Col style={{ width: '30%' }}><Card style={{backgroundColor: '#0000FF',color:WHITE,textAlign:"center"}}>All <Badge size="small" count={10} /> </Card></Col>
                                <Col style={{ width: '30%' }}><Card style={{backgroundColor: '#FFA500',color:WHITE,textAlign:"center"}}>Idle <Badge size="small" count={1} /></Card></Col>
                                <Col style={{ width: '30%' }}><Card style={{backgroundColor: 'red',color:WHITE,textAlign:"center"}}>Parking<Badge size="small" count={5} /></Card></Col>
                                {/* <Col style={{ width: '30%' }}><Card style={{backgroundColor: 'red',color:WHITE,textAlign:"center"}}>Parking <Badge size="small" count={2} /></Card></Col> */}
                            </Row>
                            <Row>
                            <Col style={{ width: '30%' }}><Card style={{backgroundColor: '#008000',color:WHITE,textAlign:"center"}}>Moving <Badge size="small" count={2} /></Card></Col>
                                <Col style={{ width: '30%' }}><Card style={{backgroundColor: 'grey',color:WHITE,textAlign:"center"}}>Offline <Badge size="small" count={5} /></Card></Col>
                                <Col style={{ width: '30%' }}><Card style={{backgroundColor: 'grey',color:WHITE,textAlign:"center"}}>Expiry <Badge size="small" count={5} /></Card></Col>

                            </Row>
                            <div className="table-responsive">
                            <Table bordered  
                                columns={tableColumns} 
                                rowKey='id' 
                                pagination={true}></Table>
                            </div>
                            
                        </div>
                    </Card>
                </Col>
            </Row>
        </Col>
        <Col xs={24} sm={24} lg={18}>
            <Card title="Vehicles">
                <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
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
            </Card>
        </Col>
        <Col>
        <p>{UserDetail?.name}</p>
        </Col>
        <p>{VehicleDetail?.device_imei}</p>
    </Row>
    </>
)
}

export default Admin;