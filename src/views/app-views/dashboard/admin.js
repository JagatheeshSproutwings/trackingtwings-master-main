import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Form,Row,Col,Card,Table,Select,Input,Badge,Avatar,Divider,Tabs, List } from 'antd'
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline} from 'react-leaflet'
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE,RED_BASE,ORANGE_BASE } from 'constants/ThemeConstant';

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
import Multivehicles from 'components/map-components/multi_dashboard_vehicles'
import api from 'configs/apiConfig';
import TestMovement from 'components/map-components/TestLiveTrack';
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
  const [vehicle_status,setVehicleStatus] = useState("");
  const token = useSelector((state) => state.auth);
  const role_id = token?.user_info?.role_id;
  const user_id = token?.user_info?.id;
  const [activeKey, setActiveKey] = useState("1"); 
  const [vehicleDisplayType,setvehicleDisplayType] = useState(1);
  const [multiplevehiclesData,setMultiplevehiclesData] = useState([]);

  const handleTabChange = (key) => {
    setActiveKey(key);
  };
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
    const vehicle_color = (value) => {
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
            return  ORANGE_BASE;
          break;
        default:
          return GRAY_DARK;
          break;
      }
  
    }
    const  vehicle_list = async (status) =>{

      const multiple_vehicles_data = await api.get("multi_dashboard").then((res) => { return res;}).catch((err) => {console.log(err)});
      if(multiple_vehicles_data?.data?.data && vehicle_status!='')
      {
        const filteredItems = multiple_vehicles_data?.data?.data.filter(item => item.vehicle_current_status === vehicle_status);
        
          const processedData = filteredItems?.map((item) => ({
            id:item?.id,
            latitude:item.lattitute,
            longtitude:item.longitute,
            title: item?.vehicle_name||"TEST",
            description:item?.device_updatedtime|| "0000-00-00 00:00:00",
            color:vehicle_color(item?.vehicle_current_status),
            speed:item?.speed||0,
            gps_count:20,
            gsm_count:15,
          }));
          setMultiplevehiclesData(processedData);
      }
      else{
        const filteredItems = multiple_vehicles_data?.data?.data;
        
          const processedData = filteredItems?.map((item) => ({
            id:item?.id,
            latitude:item?.lattitute || 0.00000,
            longtitude:item?.longitute || 0.00000,
            title: item?.vehicle_name||"TEST",
            description:item?.device_updatedtime|| "0000-00-00 00:00:00",
            device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
            color:vehicle_color(item?.vehicle_current_status),
            vehicle_current_status:item?.vehicle_current_status,
            speed:item?.speed||0,
            gps_count:20,
            gsm_count:15,
          }));
          setMultiplevehiclesData(processedData);
      }
    } 

    useEffect(()=>{
      setCurrentRole(role());
      setCurrentUser(user());
      RoleBasedUserList();
      vehicle_list();
      const interval = setInterval(() => {
        vehicle_list();
      }, 2000);
      return () => {
        clearInterval(interval);
       };
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

    const tabs = [
      { key: "1", tab: "All", content: <Dashboard_vehicles status=""/> },
      { key: "2", tab: "Parking", content: <Dashboard_vehicles status={1}/> },
      { key: "3", tab: "Idle", content: <Dashboard_vehicles status={2} />},
      { key: "4", tab: "Moving", content: <Dashboard_vehicles status={3}/> },
      { key: "5", tab: "No Data", content: <Dashboard_vehicles status={4}/> },
      { key: "6", tab: "Inactive", content: <Dashboard_vehicles status={5}/> },
      { key: "7", tab: "Expired", content: <Dashboard_vehicles status={6}/> },
    ];


    const handleChange = (value,option) =>{
        const selected_user_id = value;
        const selected_role_id = option.role_id;
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
                            <Form.Item name="subdealer_id">
                                <Select showSearch onChange={handleChange} placeholder="SubDealer">
                                    {Array.isArray(subdealerList) && subdealerList.map((subdealer) => {
                                        <Option value="{subdealer?.id}" role_id="5">{subdealer?.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            </Col>
}
{(currentRole==1 || currentRole==2 || currentRole==3 || currentRole==4 || currentRole==5) &&
                            <Col xs={12}>
                            <Form.Item name="client_id"  rules={[{required:true,message:'Customer Value is Required!'}]}>
                                <Select showSearch onChange={handleChange} placeholder="Customer">
                                {Array.isArray(customerList) && customerList.map((subdealer) => {
                                        <Option value="{customerList?.id}" role_id="6">{customerList?.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            </Col>
}
                        </Form>
                        <Card style={{padding:0,margin:0}}>
                            <StickyContainer style={{padding:0,margin:0}}>
                            <Tabs activeKey={activeKey}  onChange={handleTabChange}>
                              {tabs.map((tab) => (
                                <Tabs key={tab.key} tab={tab.tab}>
                                  {activeKey === tab.key && <div>{tab.content}</div>}
                                </Tabs>
                              ))}
                            </Tabs>
                          </StickyContainer>
                        </Card>
                    </Col>
                    <Col sm={12} md={18} lg={18} style={{padding:0}}>
                    <Multivehicles data={multiplevehiclesData}/>
                    </Col>
                </Row>
            </Col>
        </Row>        
    </>
)
}

export default Admin;