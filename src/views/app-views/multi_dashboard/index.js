import React, { useState,useEffect,useRef } from 'react'
import {Form,Row,Col,Card,Table,Select,Input,Badge,Avatar,Divider,Button,List,Space,Skeleton } from 'antd'
import L from 'leaflet';
import {MapContainer,TileLayer,Marker,Popup,LayersControl} from 'react-leaflet'
import { WHITE } from 'constants/ThemeConstant'
import { useSelector } from 'react-redux'
import api from 'configs/apiConfig'
import Chart from "react-apexcharts";
import { CarOutlined } from '@ant-design/icons';
import "leaflet-rotatedmarker";
import Flex from 'components/shared-components/Flex'
import DonutChartWidget from 'components/shared-components/DonutChartWidget'
const { Option } = Select

export const MultiDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [chartData,setChartData] = useState([0,0,0,0,0]);
  const sessionColor = ['#FF864A', '#11A578','#13b3c2','#fc3158','#a1a108']
	//const sessionData = [3561, 1443, 2462,1234,4345,4646]
	const sessionLabels = ["Idle", "Moving","Parking","Inactive","No Data"]
	const jointSessionData = () => {
		let arr = []
		for (let i = 0; i < chartData.length; i++) {
			const data = chartData[i];
			const label = sessionLabels[i];
			const color = sessionColor[i]
			arr = [...arr, {
				data: data,
				label: label,
				color: color
			}]
		}
		return arr
	}

    const markerRef = useRef();
    const startPoint = [11.0467, 76.9254];
    const moveInterval = 3000;
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    
    const positions = [
        [11.0567, 76.9345],
        [11.0589, 76.9456],
        [11.0601, 76.9543],
      ];
    const [customIconUrl,setCustomIconUrl] = useState("");
    const [CustomerId,SetCustomerId] = useState("");
    const [UserDetail,SetUserDetail] = useState({});
    const [VehicleDetail,SetVehicleDetail] = useState("");
    const [multiVehicles,setMultiVehicles] = useState([]);
    const token = useSelector(state => state.auth);
    
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
    const mapRef = useRef(null);
    const handleChange = (values) =>{
        user_list(values);
    }

    const customIcon = new L.Icon({
      iconUrl: '/img/ICONS/GREEN/car.png',
      iconSize: [32, 32], // Adjust the size as needed
      iconAnchor: [16, 32], // Anchor point for the icon
      popupAnchor: [0, -32], // Anchor point for popups relative to the icon
    });
      useEffect(()=>{
       
        const intervalId = setInterval(() => {
            vehicle_list();
            multiple_vehicles_count();
          }, moveInterval);
      
          return () => {
            clearInterval(intervalId);
          };
        
      },[])
      const  vehicle_list = async () =>{
        const vehicle_data = await api.get("vehicle_count");
        SetVehicleDetail(vehicle_data?.data);
        setChartData([vehicle_data?.data?.data?.idle,vehicle_data?.data?.data?.running,vehicle_data?.data?.data?.stop,vehicle_data?.data?.data?.no_data,vehicle_data?.data?.data?.inactive]);
      } 
      const multiple_vehicles_count = async () => {
        const multi_vehicle_list = await api.get("multi_dashboard").then(res => { return res}).catch(err => { return [];});
       
        setMultiVehicles(multi_vehicle_list?.data?.data);
        if(multi_vehicle_list?.data?.data.length>0)
        {
          console.log("Length");
        }
        
      }
const  user_list = async (values) =>{

    const user_data = await api.get("user/show/"+values).then((res) => { return res;}).catch((err) => {return [];});
   
    SetUserDetail(user_data?.data.data);
    SetCustomerId(user_data?.data.message);
} 

return(
    
    <>
    <Row gutter={16} style={{padding:0,margin:0}} >
    <Col span={4} style={{padding:0,margin:0}}>
      <Card title="All" size='small' headStyle={{ backgroundColor: '#5c6cfa', color: '#ffffff' }} bodyStyle={{ backgroundColor: '#c2c2be',color: '#ffffff' }} bordered={false} align="center">
        {VehicleDetail?.data?.total_vehicles}
      </Card>
    </Col>
    <Col span={4}>
      <Card title="Idle" size='small' headStyle={{ backgroundColor: '#FF864A', color: '#ffffff' }} bodyStyle={{ backgroundColor: '#c2c2be' ,color: '#ffffff'}} bordered={false} align="center">
      {VehicleDetail?.data?.idle}
      </Card>
    </Col>
    <Col span={4}>
      <Card title="Moving" size='small' headStyle={{ backgroundColor: '#11A578', color: '#ffffff' }} bodyStyle={{ backgroundColor: '#c2c2be',color: '#ffffff' }} bordered={false} align="center">
      {VehicleDetail?.data?.running}
      </Card>
    </Col>
    <Col span={4}>
      <Card title="Parking"  size='small' headStyle={{ backgroundColor: '#13b3c2', color: '#ffffff' }} bodyStyle={{ backgroundColor: '#c2c2be',color: '#ffffff' }} bordered={false} align="center">
      {VehicleDetail?.data?.stop}
      </Card>
    </Col>
    <Col span={4}>
      <Card title="Inactive" size='small' headStyle={{ backgroundColor: '#fc3158', color: '#ffffff' }} bodyStyle={{ backgroundColor: '#c2c2be',color: '#ffffff' }} bordered={false} align="center">
      {VehicleDetail?.data?.no_data}
      </Card>
    </Col>
    <Col span={4}>
      <Card title="No Data" size='small' headStyle={{ backgroundColor: '#a1a108', color: '#ffffff' }} bodyStyle={{ backgroundColor: '#c2c2be',color: '#ffffff' }} bordered={false} align="center">
      {VehicleDetail?.data?.inactive}
      </Card>
    </Col>

    </Row>
    <Row>
        <Col span={18}>
        <MapContainer ref={mapRef} center={position} zoom={13} scrollWheelZoom={true} >
                <LayersControl>
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                        url="http://198.204.245.190/osm/{z}/{x}/{y}.png"
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
                {multiVehicles?.map(vehicle => (
                  
                  
                <Marker key={vehicle?.id||0}  icon={customIcon} position={[vehicle?.lattitute||0.00000,vehicle?.longitute||0.00000]} rotationAngle={vehicle?.angle}  >
                    <Popup style={{fontSize:'12px',padding:'0px',margin:'0px',background:"lightblue"}}>
                      
                        <Row>
                          <Col>
                          <div>Vehicle Name : <b>{vehicle?.vehicle_name||""}</b></div>
                      <div>Vehicle Status : <b>{vehicle?.vehicle_current_status||""}</b></div>
                      <div>Main Battery Voltage : <b>{vehicle?.vehicle_battery_volt||0} Volts</b></div>
                      <div>Device Battery Percentage : <b>{vehicle?.device_battery_percentage||0} %</b></div>
                      <div>Speed :<b>{vehicle?.speed} KMPH</b></div>
                      <div>Last Updated at:<b>{vehicle?.device_updatedtime}</b> </div>
                      <div>Since : <b>{vehicle?.last_duration} (HH:MM:SS)</b></div>
                          </Col>
                        </Row>
                      
                      
                    </Popup>
                </Marker>

                ))}
                
                </MapContainer>
        </Col>
        <Col span={6}>
        <DonutChartWidget 
			series={chartData} 
			labels={sessionLabels} 
			title="Total Vehicles"
			customOptions={{colors: sessionColor}}
			extra={
				<Row  justify="center">
					<Col xs={20} sm={20} md={20} lg={24}>
						<div className="mt-4 mx-auto" style={{maxWidth: 200}}>
							{jointSessionData().map(elm => (
								<Flex alignItems="center" justifyContent="space-between" className="mb-3" key={elm.label}>
									<div>
										<Badge color={elm.color} />
										<span className="text-gray-light">{elm.label}</span>
									</div>
									<span className="font-weight-bold text-dark">{elm.data}</span>
								</Flex>
							))}
						</div>
					</Col>
				</Row>
			}
		/>
        </Col>
    </Row>
    
    </>
)
}

export default MultiDashboard;