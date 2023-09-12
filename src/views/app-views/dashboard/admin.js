import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
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
import TrackingMarker from 'components/map-components/trackingMarker';
import Dashboard_vehicles from 'components/map-components/dashboard_vehicles'
import MovingVehicle from 'components/map-components/liveTrack'
import api from 'configs/apiConfig';
import TestMovement from 'components/map-components/smoothMovement';
const { Option } = Select

export const Admin = () => {
  const [currentRole,setCurrentRole] = useState(); 
  const [currentUser,setCurrentUser] = useState();
  const [adminList,SetAdminList] = useState([]); 
  const [SelectedDistributor,setSelectedDistributor] = useState("");
  const [distributorList,SetDistributorList] = useState([]); 
  const [dealerList,SetDealerList] = useState([]); 
  const [subdealerList,SetSubdealerList] = useState([]); 
  const [customerList,SetCustomerList] = useState([]); 
  const [adminUser,setadminuser] = useState(false);
  const [distributorUser,setDistributoruser] = useState(false);
  const [dealerUser,setDealeruser] = useState(false);
  const [subdealerUser,setSubdealeruser] = useState(false);
  const [subcustomerUser,setCustomeruser] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const token = useSelector((state) => state.auth);
  const role_id = token?.user_info?.role_id;
  const user_id = token?.user_info?.id;
  
  console.log(role_id);
  const user = () => {
    return localStorage.getItem("id");
  };
  const role = () => {
    return localStorage.getItem("role");
  };

    const RoleBasedUserList  = () => {

      if(role_id===1)
      {
        setadminuser(true);
        const admin_list = getUserList(currentUser);
        SetAdminList(admin_list);
      }
      if(role_id===2)
      {
        setDistributoruser(true);
        getDistributorList();
        console.log(distributorList);
      }
    }
    const getAdminList = async () => {
      const admin_data = { user_id: user_id};
      const admin_list = await api.post("role_based_user_list",admin_data).then((res) => { return res;}).catch((err) => { return [];});
      SetAdminList(admin_list?.data?.data?.user_list);
    }
    const getDistributorList = async () => {
      const distributor_data = { user_id: user_id};
      const distributor_list = await api.post("role_based_user_list",distributor_data).then((res) => { return res;}).catch((err) => { return [];});
      if(distributor_list?.data?.data?.user_list.length>0)
      {
        console.log(distributor_list?.data?.data?.user_list[0].id);
        setSelectedDistributor(distributor_list?.data?.data?.user_list[0].id);
      }
      SetDistributorList(distributor_list?.data?.data?.user_list);
    }

    const getDealerList = async () => {
      const dealer_data = { user_id: user_id};
      const dealer_list = await api.post("role_based_user_list",dealer_data).then((res) => { return res;}).catch((err) => { return [];});
      SetDealerList(dealer_list?.data?.data?.user_list);
    }

    const getSubDealerList = async () => {
      const subdealer_data = { user_id: user_id};
      const subdealer_list = await api.post("role_based_user_list",subdealer_data).then((res) => { return res;}).catch((err) => { return [];});
      SetSubdealerList(subdealer_list?.data?.data?.user_list);
    }
    const getCustomerList = async () => {
      const customer_data = { user_id: user_id};
      const customer_list = await api.post("role_based_user_list",customer_data).then((res) => { return res;}).catch((err) => { return [];});
      SetCustomerList(customer_list?.data?.data?.user_list);


    }
    const getUserList = async (current_user_id) => {
      const user_data = { user_id: current_user_id };
      const user_list = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
      
    }
   
    useEffect(()=>{
      setCurrentRole(role());
      setCurrentUser(user());
      RoleBasedUserList();
    },[])

    const dataStory = [
      {
        lat: 53.22376666666667,
        lng: 50.745841666666664,
        angle:20,
      },
      {
        lat: 53.22376666666667,
        lng: 50.745841666666664,
        angle:30,
      },
      {
        lat: 53.223728333333334,
        lng: 50.74598666666667,
        angle:35
      },
      {
        lat: 53.223705,
        lng: 50.746021666666664
      },
      {
        lat: 53.22365166666667,
        lng: 50.746075
      }
    ];

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
    const handleChange = (value,option) =>{
        const selected_user_id = value;
        const selected_role_id = option.role_id;
        console.log(selected_user_id);
        console.log(selected_role_id);
        switch (selected_role_id) {
          case 1:
            return getAdminList(selected_user_id);
            break;
          case 2:
            return getDistributorList(selected_user_id);
            break;
            case 3:
              return getDealerList(selected_user_id);
              break;
              case 4:
              return getSubDealerList(selected_user_id);
              case 5:
              return getCustomerList(selected_user_id);
              break;
          default:
            break;
        }
        
    }
    
return(
    <>
        <Row style={{height:'700','margin':'0','padding':'0'}}>
            <Col xs={24} sm={24} md={24} lg={24} style={{padding:0,margin:0}}>
                <Row gutter={6} style={{padding:0,margin:0}}>
                    <Col sm={12} md={6} lg={6}  style={{padding:0,margin:0}}>
                    <Form name="customer-form" layout="inline" size="small">
                      {currentRole==1 && 
                            <Col xs={12}>
                            <Form.Item name="admin_id" size="small" rules={[{required:true,message:'Admin Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Admin">
                                {Array.isArray(adminList) ? (
                        adminList.map((admin) => (
                          <Select.Option 
                            key={admin?.id}
                            role_id="2"
                            value={admin?.id}
                          >
                            {admin?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value="" role_id="3"></Select.Option>
                      )}
                                </Select>
                            </Form.Item>
                            </Col>
                    }
                    {(currentRole==1 || currentRole==2) &&
                            <Col xs={12}>
                            <Form.Item name="distributor_id" size="small" rules={[{required:true,message:'Distributor Value is Required!'}]}>
                                <Select showSearch  onChange={handleChange} placeholder="Distributor">
                                {Array.isArray(distributorList) ? (
                        distributorList.map((distributor) => (
                          <Select.Option 
                            key={distributor?.id}
                            role_id="3"
                            value={distributor?.id}
                          >
                            {distributor?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value="" role_id="3"></Select.Option>
                      )}
                                </Select>
                            </Form.Item>
                            </Col>
}
{(currentRole==1 || currentRole==2 || currentRole==3) &&
                            <Col xs={12}>
                            <Form.Item name="dealer_id"  rules={[{required:true,message:'Dealer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Dealer">
                                {Array.isArray(dealerList) ? (
                        dealerList.map((dealer) => (
                          <Select.Option 
                            key={dealer?.id}
                            role_id="4"
                            value={dealer?.id}
                          >
                            {dealer?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value="" role_id="3"></Select.Option>
                      )}
                                </Select>
                            </Form.Item>
                            </Col>
}
{(currentRole==1 || currentRole==2 || currentRole==3 || currentRole==4) &&
                            <Col xs={12}>
                            <Form.Item name="subdealer_id"  rules={[{required:true,message:'SubDealer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="SubDealer">
                                    <Option value="1" role_id="5">Customer 1</Option>
                                    <Option value="2" role_id="5">Customer 2</Option>
                                    <Option value="3" role_id="5">Customer 3</Option>
                                    <Option value="4" role_id="5">Customer 4</Option>
                                </Select>
                            </Form.Item>
                            </Col>
}
{(currentRole==1 || currentRole==2 || currentRole==3 || currentRole==4 || currentRole==5) &&
                            <Col xs={12}>
                            <Form.Item name="client_id"  rules={[{required:true,message:'Customer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Customer">
                                    <Option value="1" role_id="6">Customer 1</Option>
                                    <Option value="2" role_id="6">Customer 2</Option>
                                    <Option value="3" role_id="6">Customer 3</Option>
                                    <Option value="4" role_id="6">Customer 4</Option>
                                </Select>
                            </Form.Item>
                            </Col>
}
                        </Form>
                        <Card style={{padding:0,margin:0}}>
                            <StickyContainer style={{padding:0,margin:0}}>
                                <Tabs defaultActiveKey="1" size='small'   items={[
                                        {
                                            label: `All`,
                                            key: '1',
                                            children: <Dashboard_vehicles/>,
                                        },
                                        {
                                            label: `Moving`,
                                            key: '2',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `Idle`,
                                            key: '3',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `Parking`,
                                            key: '4',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                            label: `No Data`,
                                            key: '5',
                                            children: <AllVehicles/>,
                                        },
                                        {
                                          label: `Inactive`,
                                          key: '6',
                                          children: <AllVehicles/>,
                                      },
                                        {
                                            label: `Expired`,
                                            key: '7',
                                            children: <AllVehicles/>,
                                        },
                                    ]} />
                            </StickyContainer>
                        </Card>
                    </Col>
                    <Col sm={12} md={18} lg={18} style={{padding:0}}>
                        
                        <TestMovement />
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
                            </MapContainer> */}
                        
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

export default Admin;