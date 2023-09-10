import React, { useState,useEffect } from 'react'
import {Form,Row,Col,Card,Button,Table,Select,Input,Badge,Avatar,Divider,Tabs, List, Icon } from 'antd'
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline,Tooltip} from 'react-leaflet'
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE,RED_BASE } from 'constants/ThemeConstant';
import { WHITE } from 'constants/ThemeConstant'
import { Sticky, StickyContainer } from 'react-sticky';
import { CarFilled,WifiOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'assets/styles/multi_dashboard.css'
import { faEllipsisVertical,faLocationCrosshairs,faPlug } from '@fortawesome/free-solid-svg-icons'
import AllVehicles from 'components/map-components/allVehicles';
import IdleVehicles from 'components/map-components/idleVehicles';
import MovingVehicles from 'components/map-components/movingVehicles';
import ParkingVehicles from 'components/map-components/parkingVehicles';
import NoNetworkVehicles from 'components/map-components/noNetworkVehicles';
import NoDataVehicles from 'components/map-components/noDataVehicles';
import MovingMarkerMap from 'components/map-components/movingMap';
import L from "leaflet";
import "leaflet-marker-rotation";
import api from 'configs/apiConfig'
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
export const SingleDashboard = () => {
    const [multipleVehicles,setMultiVehicles] = useState([]);
    const [vehicle_status,setvehicleStatus] = useState(0);
    const [currentVehicle,setCurrentVehicle] = useState("");
    const [vehicleInfo,setvehicleInfo] = useState([]);
    const [lat, setLat] = useState(22.899397);
    const [lon, setLon] = useState(89.508279);
    const [heading, setHeading] = useState(30);
    const [speed, setSpeed] = useState(0);
    const [vehicle_name, setVehicleName] = useState("");

    const defaultIcon = L.icon({
        iconUrl: "/img/ICONS/GREEN/car.png",
        iconSize: [40, 40],
        iconAnchor: [18, 18],
        popupAnchor: [0, -10],
        shadowAnchor: [10, 10]
      });

    

    const UpdateVehicleStatus = e => {
        const value = e.currentTarget.value;
        console.log(value);
    }
    
    const center = [lat, lon]
    const polyline = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
      ]
      const limeOptions = { color: 'lime' }
    const { BaseLayer } = LayersControl;
    const vehicle_color = (value) => {
        if(value==1)
        {
            return "BLUE_BASE";
        }
    }
    
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
    const handleChange = (vechicle_id) =>{
        setCurrentVehicle(vechicle_id);
        localStorage.setItem('current_vehicle',vechicle_id);
    }
   
    const vehcile_icon_type = (type) => {
        switch(type) {
            case '1':
              return 'bike.png';
              case '2':
              return 'car.png';
              case '3':
              return 'bus.png';
              case '4':
              return 'bus.png';
              case '5':
              return 'truck.png';
              case '6':
              return 'container.png';
              case '7':
              return 'open_truck.png';
              case '8':
              return 'rmc_truck.png';
              case '9':
              return 'cylinder_truck.png';
              case '10':
              return 'container.png';
              case '11':
              return 'jcb.png';
              case '12':
              return 'loader.png';
              case '13':
              return 'ace.png';
              case '14':
              return 'tipper.png';
              case '15':
              return 'tractor.png';
              case '16':
                return 'generator.png';
            default:
              return 'car.png';
          }

    }
    const vehicle_status_current = (type) => {
        switch(type) {
            case 1:
              return 'PARKING';
              case 2:
              return 'IDLE';
              case 3:
              return 'MOVING';
              case 4:
              return 'NO DATA';
              case 5:
              return 'IN ACTIVE';
              default:
                return 'IN ACTIVE';
        }
    }
    const vehcile_icon_colour = (type) => {
        if(type==1)
        {
            return BLUE_BASE;
        }
        if(type==2)
        {
            return GOLD_BASE;
        }
        if(type==3)
        {
            return GREEN_BASE;
        }
        if(type==4)
        {
            return GRAY_DARK;
        }
        if(type==5)
        {
            return RED_BASE;
        }
    }
    const vehcile_icon_path = (type) => {
        if(type==1)
        {
            return "/img/ICONS/BLUE/";
        }
        if(type==2)
        {
            return "/img/ICONS/YELLOW/";
        }
        if(type==3)
        {
            return "/img/ICONS/GREEN/";
        }
        if(type==4)
        {
            return "/img/ICONS/RED/";
        }
        if(type==5)
        {
            return "/img/ICONS/GRAY/";
        }
    }
    const single_vehicle_details = async (value) => {

        const vehicle_details = await api.get("single_dashboard/"+value).then((res) => { return res;}).catch((err) => {console.log(err)});
        if(vehicle_details?.data?.status_code===200)
        {
            
            const vehicle_detail = {
                vehicle_name:vehicle_details?.data?.data?.vehicle_name||"",
                vehicle_latitude:vehicle_details?.data?.data?.lattitute||0.00,
                vehicle_longitude:vehicle_details?.data?.data?.longitute||0.000,
                vehicle_speed:vehicle_details?.data?.data?.speed||0,
                vehicle_angle:vehicle_details?.data?.data?.angle||0,
                vehicle_battery_voltage:vehicle_details?.data?.data?.vehicle_battery_volt||0,
                device_battery_voltage:vehicle_details?.data?.data?.device_battery_volt||0,
                device_battery_percentage:vehicle_details?.data?.data?.battery_percentage||0,
                vehicle_background_colour:vehcile_icon_colour(vehicle_details?.data?.data?.vehicle_current_status||4),
                vehicle_last_updated:vehicle_details?.data?.data?.device_updatedtime,
                vehicle_since:vehicle_details?.data?.data?.last_duration,
                vehicle_icon_path:vehcile_icon_path(vehicle_details?.data?.data?.vehicle_current_status||4),
                vehicle_icon_image:vehcile_icon_type(vehicle_details?.data?.data?.vehicle_type_id||1),
                vehicle_status_current_type : vehicle_status_current(vehicle_details?.data?.data?.vehicle_current_status||4)
            };
            setvehicleInfo(vehicle_detail);
            //setvehicleInfo(vehicle_details?.data?.data);
        }
        
        
            setVehicleName(vehicle_details?.data?.data?.vehicle_name||0.00);
            setLat(vehicle_details?.data?.data?.lattitute||0.00);
            setLon(vehicle_details?.data?.data?.longitute||0.00);
            setHeading(vehicle_details?.data?.data?.angle||0);
            setSpeed(vehicle_details?.data?.data?.speed||0);
    }
    const  idle_vehicle_list = async (value) =>{
  
        const multiple_vehicles_data = await api.get("multi_dashboard").then((res) => { return res;}).catch((err) => {console.log(err)});
        if(multiple_vehicles_data?.data?.data && vehicle_status!=0)
        {
          const filteredItems = multiple_vehicles_data?.data?.data.filter(item => item.vehicle_current_status === vehicle_status);
            const processedData = filteredItems.map((item) => ({
              id:item?.id,
              device_imei:item?.device_imei,
              title: item?.vehicle_name||"TEST",
              description:item?.device_updatedtime|| "0000-00-00 00:00:00",
              color:vehcile_icon_colour(item.vehicle_current_status),
              speed:item?.speed||0,
              gps_count:20,
              gsm_count:15,
            }));
            setMultiVehicles(processedData);
        }else{
            const filteredItems = multiple_vehicles_data?.data?.data;
        const processedData = filteredItems.map((item) => ({
          id:item?.id,
          device_imei:item?.device_imei,
          title: item?.vehicle_name||"TEST",
          description:item?.device_updatedtime|| "0000-00-00 00:00:00",
          color:vehcile_icon_colour(item.vehicle_current_status),
          speed:item?.speed||0,
          gps_count:20,
          gsm_count:15,
        }));
      
      setMultiVehicles(processedData);
        }
      }
    const onChange = (key) => {
        console.log(key-1);
        const current_status = key-1;
     };
     useEffect(()=>{
        const interval = setInterval(() => {
          idle_vehicle_list();
          const current_vehicle = localStorage.getItem('current_vehicle');
          if(current_vehicle)
          {
            single_vehicle_details(current_vehicle);
          }
        
        }, 1000);
        return () => {
          clearInterval(interval);
        };
        
      },[])

return(
    <>
         <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
                <Row gutter={6} style={{padding:0,margin:0}} >
                    <Col sm={12} md={4} lg={4}>
                    <StickyContainer style={{padding:0,margin:0}}>
                    <Row type="flex" align={center}>
                        <Col xl={24} sm={12} >
                            <ButtonGroup size='small'>
                                <Button type="primary" size="small" ghost style={{fontSize:'13px'}}> All </Button>
                                <Button type="primary" size="small" ghost style={{fontSize:'12px'}}>Moving</Button>
                                <Button type="primary" size="small" ghost style={{fontSize:'12px'}}>Idle</Button>
                                <Button type="primary" size="small" ghost style={{fontSize:'12px'}}>Parking</Button>
                                <Button type="primary" size="small" ghost style={{fontSize:'10px'}}>No Network</Button>
                                <Button type="primary" size="small"  style={{fontSize:'12px'}}>No Data </Button>
                            </ButtonGroup>
                            <List style={{padding:0,margin:1,fontSize:'10px',border:'1px'}}
    itemLayout="horizontal"
    size='small'
    dataSource={multipleVehicles}
    // pagination={{
    //   onChange: page => {
    //     console.log(page);
    //   },
    //   pageSize: 10,
    // }}
    renderItem={item => (
      <List.Item value={item?.id} onClick={()=> handleChange(item?.device_imei)} actions={[ <a key="list-loadmore-more"><FontAwesomeIcon icon={faEllipsisVertical} style={{fontSize: '15px',padding:'0',color:GREEN_BASE}}/></a>]}>
        <List.Item.Meta
          avatar={ <Avatar size="small"  style={{backgroundColor:'transparent'}} icon={<CarFilled style={{ fontSize: '20px',padding:'0',color: item.color } }/>}/>}
          title={<span style={{fontSize:'12px'}}>{item.title}</span>}
          description={<span style={{fontSize:'10px'}}>{item.description}</span>}
        />
        <Row style={{padding:0}}>
          <Col className='ml-15'>
            <h6>{item.speed} KMPH</h6>
          </Col >
          <Col className='ml-2'>
            <WifiOutlined style={{fontSize: '15px',color:GREEN_BASE}} />
          </Col>
          <Col className='ml-2'>
            <FontAwesomeIcon icon={faLocationCrosshairs} style={{fontSize: '15px',color:GREEN_BASE}}/>
          </Col>
          <Col className='ml-2'>
          <FontAwesomeIcon icon={faPlug} style={{fontSize: '15px',color: GREEN_BASE}} />
          </Col>
        </Row>
      </List.Item>
    )}
  />
                        </Col>
                    </Row>
                    <Row>
                        {currentVehicle?<h2>Single</h2>:<h2>Multiple</h2>}
                    </Row>
                            {/* <Row>
                                <Col span={4}>
                                    <Button size='small'>All (5)</Button>
                                </Col>
                                <Col span={4}>
                                    <Button size='small'>Moving (2)</Button>
                                </Col>
                                <Col span={4}>
                                    <Button size='small'>Idle (1)</Button>
                                </Col>
                                <Col span={4}>
                                    <Button size='small'>Parking (2)</Button>
                                </Col>
                                <Col span={4}>
                                    <Button size='small'>Inactive(1)</Button>
                                </Col>
                                <Col span={4}>
                                    <Button size='small'>No Data (1)</Button>
                                </Col>

                            </Row> */}
                                {/* <Tabs defaultActiveKey="1" size='small' style={{fontSize:'10px'}} onChange={onChange}  items={[
                                        {
                                            label: `All`,
                                            key: '1',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `Moving`,
                                            key: '4',
                                            children: <MovingVehicles/>,
                                        },
                                        {
                                            label: `Idle`,
                                            key: '2',
                                            children: <IdleVehicles/>,
                                        },
                                        {
                                            label: `Parking`,
                                            key: '3',
                                            children: <ParkingVehicles/>,
                                        },
                                        
                                        {
                                            label: `InActive`,
                                            key: '5',
                                            children: <NoNetworkVehicles/>,
                                        },
                                        {
                                            label: `NoData`,
                                            key: '6',
                                            children: <NoDataVehicles/>,
                                        },
                                    ]} /> */}
                            </StickyContainer>
                    </Col>
                    <Col sm={12} md={20} lg={20}>
                    <Tabs type="card">
                        <TabPane tab={currentVehicle} key="1">
                            {/* <MovingMarkerMap/> */}
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
                                
                                    <Marker position={[lat, lon]}
                                    icon={defaultIcon}
                                    rotationAngle={heading}
                                    rotationOrigin="center">
                                                                <Popup style={{padding:0,margin:0}}>
                                                                    
                                                                    <Card size="small" style={{padding:0,margin:0}}>
                                                                        <Row style={{padding:0,margin:0,fontSize:'10px'}}>
                                                                            <Col >
                                                                                <div><b>{vehicleInfo?.vehicle_name}</b></div>
                                                                                <div>Status: {vehicleInfo?.vehicle_status_current_type} </div>
                                                                                <div>Speed: {vehicleInfo?.vehicle_speed} km/hr</div>
                                                                                <div>Battery: {vehicleInfo?.vehicle_battery_volt||0} V</div>
                                                                                <div>Device Battery: {vehicleInfo?.device_battery_percentage||0}%</div>
                                                                                <div>Today KM: {vehicleInfo?.device_battery_percentage||0} KM</div>
                                                                                <div>Updated: {vehicleInfo?.vehicle_last_updated}</div>
                                                                                <div>Since : {vehicleInfo?.vehicle_since} </div>
                                                                                <div>Lat/Long: {vehicleInfo?.vehicle_latitude},{vehicleInfo?.vehicle_longitude}</div>
                                                                            </Col>
                                                                            
                                                                        </Row>
                                                                    </Card>
                                                                </Popup>
                                                                
                                                            </Marker>
                               
                                

                                {/* <Polyline pathOptions={limeOptions} positions={polyline} /> */}
                            </MapContainer>
                        </TabPane>
                        <TabPane tab="CHARTS" key="2">
                            <p>CHARTS</p>
                        </TabPane>
                        <TabPane tab="TABLE VIEW" key="3">
                            <p>TABLE VIEW</p>
                        </TabPane>
                        </Tabs>
                    {/* <MovingMarkerMap/> */}
                    
                    </Col>
                </Row>
            </Col> 
        </Row>                          
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

export default SingleDashboard;