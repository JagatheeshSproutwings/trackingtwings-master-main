import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Form,Row,Col,Button,Card,Table,Select,Input,Badge,Avatar,Divider,Tabs, List,Spin,Tooltip, Space  } from 'antd'
import {MapContainer,TileLayer,Marker,Popup,LayersControl,Polyline} from 'react-leaflet'
import { CarFilled,WifiOutlined } from '@ant-design/icons';
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE,RED_BASE,ORANGE_BASE } from 'constants/ThemeConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical,faLocationCrosshairs,faPlug } from '@fortawesome/free-solid-svg-icons'

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
import persistedApi from 'configs/persistedApi';
import api from "configs/apiConfig";
import TestMovement from 'components/map-components/TestLiveTrack';
import LiveTracking from 'components/map-components/live_tracking_map'
import 'assets/styles/form_item.css'
const { Option } = Select
const { Search } = Input;

export const Admin = () => {
  const [currentRole,setCurrentRole] = useState(); 
  const [currentUser,setCurrentUser] = useState();
  const [adminList,SetAdminList] = useState([]); 
  const [SelectedDistributor,setSelectedDistributor] = useState("");
  const [distributorList,SetDistributorList] = useState([]); 
  const [dealerList,SetDealerList] = useState([]); 
  const [subdealerList,SetSubdealerList] = useState([]); 
  const [customerList,SetCustomerList] = useState([]);
  const [listCustomer,setCurrentCustomerList] = useState([]); 
  const [adminUser,setadminuser] = useState(false);
  const [distributorUser,setDistributoruser] = useState(false);
  const [dealerUser,setDealeruser] = useState(false);
  const [subdealerUser,setSubdealeruser] = useState(false);
  const [subcustomerUser,setCustomeruser] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [vehicle_status,setVehicleStatus] = useState("");
  const [selectedCustomer,SetSelectedCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminLoading,setAdminLoading] = useState(false);
  const [distributorLoading,setDistributorLoading] = useState(false);
  const [dealerLoading,setDealerLoading] = useState(false);
  const [subdealerLoading,setSubdealerLoading] = useState(false);
  const [customerLoading,setCustomerLoading] = useState(false);
  const [currentCustomerUser,setCurrentCustomerUser] = useState("");
  const {token} = useSelector((state) => state.auth);
  const {user_info} = useSelector((state) => state.auth);
  console.log(user_info);
  const role_id = user_info?.role_id;
  const user_id = user_info?.id;
  
  const [activeKey, setActiveKey] = useState("1"); 
  const [vehilcecount,setvehiclecount] = useState([]);
  const [vehicleDisplayType,setvehicleDisplayType] = useState(1);
  const [multiplevehiclesData,setMultiplevehiclesData] = useState([]);
  const [mapvehicleDate,setmapvehicleDate] = useState([]);
  const [singleVehicle,setSingleVehicle] = useState("");
  const [currentVehicle,setCurrentVehicle] = useState("");

  const handleTabChange = (e) => {
    const tab_value = e.target.getAttribute('value');
    console.log(tab_value);
    setActiveKey(tab_value);
    localStorage.setItem('current_vehicle_status',tab_value)
    setVehicleStatus(tab_value);
  };
  const getCurrentVehicleStatus = () => {

    return localStorage.getItem('current_vehicle_status') || "";
  }
  const getCurrentVehicle = () => {
    return localStorage.getItem('current_vehicle_id') || "";
  }
  const getCurrentCustomer = () => {
    return localStorage.getItem('current_customer_id') || "";
  }
  const live_vehicle = getCurrentVehicle();
const single_vehicle_live_data = () => {
  const customer_id = getCurrentCustomer();
  const vehicle_device_imei = getCurrentVehicle();
  setCurrentVehicle(vehicle_device_imei);
  console.log('Current vehicle Data :'+vehicle_device_imei);
}
 
  const SingleVehicle = async (value) => {
    
    localStorage.setItem('current_vehicle_id',value);
    
    const current_vehicle_id = getCurrentVehicle();
    console.log(currentVehicle);
    if(value && role_id===6)
    {
    try {
      const singlevehicles_data = await api.get("single_dashboard/"+value).then((res) => { return res;}).catch((err) => {return [];});
    const processedData = singlevehicles_data?.data?.data;
    // const single_map_data = Object.keys(processedData).map((key) => processedData[key]);
    // console.log(single_map_data[1]); 
    
    
    const mapData = [{
      id:processedData?.id,
      device_imei:processedData?.device_imei,
      live_status:vehicle_live_status(processedData?.vehicle_current_status),
      icon_url:vehicle_icon_url(processedData?.vehicle_current_status)+processedData?.short_name+'.png',
      latitude:processedData?.lattitute||0.0000,
      longtitude:processedData?.longitute||0.0000,
      last_duration:processedData?.last_duration,
      title: processedData?.vehicle_name||"TEST",
      description:processedData?.device_updatedtime|| "0000-00-00 00:00:00",
      device_time:processedData?.device_updatedtime|| "0000-00-00 00:00:00",
      color:vehicle_color(processedData?.vehicle_current_status),
      angle:processedData?.angle ||0,
      speed:processedData?.speed||0,
      gps_count:20,
      gsm_count:15,
    }];
    console.log(Array.isArray(mapData)?'True':'False');
    setmapvehicleDate(mapData);
    } catch (error) {
      console.error("Error Fetching Vehicle Data");
    }
    
    }


    if(value && role_id!=6 && currentCustomerUser!='')
    {
      
      const customer_data = {user_id:currentCustomerUser};
      const singlevehicles_data = await api.post("client_multi_dashboard",customer_data).then((res) => { return res;}).catch((err) => { return [];});
      
      
      if(singlevehicles_data?.data?.data)
      {
       
        const vehicle_data = singlevehicles_data?.data?.data.filter(item => item.device_imei === currentVehicle);
         
        const processedData = vehicle_data.map((item) => ({
          id:item?.id,
          device_imei:item?.device_imei,
          live_status:vehicle_live_status(item?.vehicle_current_status),
          icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
          latitude:item.lattitute,
          longtitude:item.longitute,
          last_duration:item?.last_duration,
          title: item?.vehicle_name||"TEST",
          description:item?.device_updatedtime|| "0000-00-00 00:00:00",
          device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
          color:vehicle_color(item?.vehicle_current_status),
          angle:item?.angle ||0,
          speed:item?.speed||0,
          gps_count:20,
          gsm_count:15,
        }));
  
        setmapvehicleDate(processedData);
      }
      
  
    }
    
    
    
    
  }
  const onSearch = (e) => {
    const search_value = e.target.value;
    const selected_vehicles = multiplevehiclesData?.filter(item => item.vehicle_name === search_value);
     console.log(search_value);
     console.log(selected_vehicles);
    //setMultiVehicles(selected_vehicles);
  };
  const user = () => {
    return localStorage.getItem("id");
  };
  const role = () => {
    return localStorage.getItem("role");
  };
  const vehicle_count = async () => {
    if(role_id===6)
    {
      const count_vehicles =  await api.get("vehicle_count").then((res)=> { return res;}).catch((err)=>{return [];});
      console.log(count_vehicles?.data?.data);
      setvehiclecount(count_vehicles?.data?.data);
  
    }else{
      console.log(selectedCustomer);
      if(selectedCustomer!='')
      {
        const customer_data = {user_id:selectedCustomer};
        const count_vehicles =  await api.post("client_vehicle_count",customer_data).then((res)=> { return res;}).catch((err)=>{return [];});
        console.log(count_vehicles?.data?.data);
        setvehiclecount(count_vehicles?.data?.data);
      }
    }
  }

    const RoleBasedUserList  = () => {

      if(role_id===1)
      {
        setadminuser(true);
        getAdminList();
      }
      if(role_id===2)
      {
        setDistributoruser(true);
        getDistributorList();
      }
      if(role_id===3)
      {
        setDistributoruser(true);
        getDealerList();
      }
      if(role_id===4)
      {
        setDistributoruser(true);
        getSubDealerList();
        getCustomerList();
      }
      if(role_id===5)
      {
        setDistributoruser(true);
        getCustomerList();
      }
    }
    const getAdminList = async () => {
      const admin_data = { user_id: user_id};
      const admin_list = await api.post("role_based_user_list",admin_data).then((res) => { return res;}).catch((err) => { return [];});
      SetAdminList(admin_list?.data?.data?.user_list);
    }
    const getDistributorList = async () => {
      console.log(user_id);
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
      SetSubdealerList(subdealer_list?.data?.data?.subdealer_list);
      getCustomerList();
    }
    const getCustomerList = async () => {
      const customer_data = { user_id: user_id};
      const customer_list = await api.post("role_based_user_list",customer_data).then((res) => { return res;}).catch((err) => { return [];});
      setCurrentCustomerList(customer_list?.data?.data?.user_list);
      console.log(customer_list?.data?.data?.user_list);
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

    const vehicle_icon_url = (status) => 
    {
      switch (status) {
        case 1:
          return  '/img/ICONS/BLUE/';
          break;
        case 2:
          return '/img/ICONS/YELLOW/';
          break;
        case 3:
          return '/img/ICONS/GREEN/';
          break;
          case 4:
            return '/img/ICONS/RED/';
          break;
          case 5:
            return '/img/ICONS/GRAY/';
          break;
          case 6:
            return  '/img/ICONS/PURPLE/';
          break;
        default:
          return '/img/ICONS/GRAY/';
          break;
      }
    }

    const vehicle_live_status = (value) => {
      switch (value) {
          case 1:
            return  'Parking';
            break;
          case 2:
            return 'Idle';
            break;
          case 3:
            return 'Moving';
            break;
            case 4:
              return 'No Data';
            break;
            case 5:
              return 'Inactive';
            break;
            case 6:
              return 'Expired';
            break;
          default:
            return 'No Data';
            break;
        }
  }

    const single_vehicle_data = async () => {
      
      if(role_id ===6)
      {
        
        console.log('working ');
        console.log(currentVehicle);

      }else{
        if(currentVehicle!="")
        {
          const vehicle_data = await api.get("single_dashboard/"+currentVehicle).then((res) => { return res;}).catch((err) => { return [];});
          console.log(vehicle_data);
        }

      }
    
    }
    const  vehicle_list = async (status) =>{
      
      const current_vehicle = getCurrentVehicle();
      const status_vehicle = getCurrentVehicleStatus();
      
      try {
        if(role_id ===6)
      {
        
        const multiple_vehicles_data = await api.get("multi_dashboard").then((res) => { return res;}).catch((err) => {return [];});
        console.log(multiple_vehicles_data);
        if(multiple_vehicles_data?.data?.data && status!='' )
        {
          const filteredItems = multiple_vehicles_data?.data?.data.filter(item => item.vehicle_current_status == status);
          console.log(filteredItems);
          if(filteredItems)
          {
            
            const device_imei = current_vehicle!='' ?current_vehicle:filteredItems[0].device_imei;
            console.log(device_imei);
            const single_data = filteredItems.filter(item => item.device_imei == device_imei);
            console.log(single_data);
              const processedData = single_data?.map((item) => ({
                id:item?.id,
                device_imei:item?.device_imei,
                live_status:vehicle_live_status(item?.vehicle_current_status),
                icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
                latitude:item.lattitute,
                longtitude:item.longitute,
                last_duration:item?.last_duration,
                title: item?.vehicle_name||"TEST",
                description:item?.device_updatedtime|| "0000-00-00 00:00:00",
                color:vehicle_color(item?.vehicle_current_status),
                angle:item?.angle ||0,
                speed:item?.speed||0,
                gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
                gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
                power_status : item?.power_status ? GREEN_BASE : RED_BASE,
              }));
              setMultiplevehiclesData(processedData);
              setmapvehicleDate(processedData);
              
          }
        }
        else{
          
          const filteredItems = multiple_vehicles_data?.data?.data;
          if(filteredItems)
          {
            
            const device_imei = current_vehicle!='' ?current_vehicle:filteredItems[0].device_imei;
            console.log(filteredItems);
            const single_data = filteredItems.filter(item => item.device_imei == device_imei);
              const processedData = filteredItems?.map((item) => ({
                
                id:item?.id,
                device_imei:item?.device_imei,
                live_status:vehicle_live_status(item?.vehicle_current_status),
                icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
                last_duration:item?.last_duration,
                latitude:item?.lattitute || 0.00000,
                longtitude:item?.longitute || 0.00000,
                title: item?.vehicle_name||"TEST",
                description:item?.device_updatedtime|| "0000-00-00 00:00:00",
                device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
                color:vehicle_color(item?.vehicle_current_status),
                vehicle_current_status:item?.vehicle_current_status,
                angle:item?.angle ||0,
                speed:item?.speed||0,
                gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
                gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
                power_status : item?.power_status ? GREEN_BASE : RED_BASE,
              }));
              setMultiplevehiclesData(processedData);
              const vehicleData = single_data?.map((item) => ({
                id:item?.id,
                device_imei:item?.device_imei,
                live_status:vehicle_live_status(item?.vehicle_current_status),
                icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
                last_duration:item?.last_duration,
                latitude:item?.lattitute || 0.00000,
                longtitude:item?.longitute || 0.00000,
                title: item?.vehicle_name||"TEST",
                description:item?.device_updatedtime|| "0000-00-00 00:00:00",
                device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
                color:vehicle_color(item?.vehicle_current_status),
                vehicle_current_status:item?.vehicle_current_status,
                angle:item?.angle ||0,
                speed:item?.speed||0,
                gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
                gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
                power_status : item?.power_status ? GREEN_BASE : RED_BASE,
              }));
              console.log(single_data);
              setmapvehicleDate(vehicleData);
              
            }

        }
          
      }else{
        
        if(currentCustomerUser)
        {
          const customer_input = {user_id:currentCustomerUser};
          const customer_vehicles = await api.post("client_multi_dashboard",customer_input).then((res)=>{ return res;}).catch((err)=>{return [];});
          if(customer_vehicles?.data?.data)
          {
            const single_data = customer_vehicles?.data?.data.filter(item => item.device_imei == current_vehicle);
            
            const vehicleData = single_data?.map((item) => ({
              id:item?.id,
              device_imei:item?.device_imei,
              live_status:vehicle_live_status(item?.vehicle_current_status),
              icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
              last_duration:item?.last_duration,
              latitude:item?.lattitute || 0.00000,
              longtitude:item?.longitute || 0.00000,
              title: item?.vehicle_name||"TEST",
              description:item?.device_updatedtime|| "0000-00-00 00:00:00",
              device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
              color:vehicle_color(item?.vehicle_current_status),
              vehicle_current_status:item?.vehicle_current_status,
              angle:item?.angle ||0,
              speed:item?.speed||0,
              gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
              gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
              power_status : item?.power_status ? GREEN_BASE : RED_BASE,
            }));
            setmapvehicleDate(vehicleData);
          }
          if(customer_vehicles?.data?.data)
          {
            const AllvehicleData = customer_vehicles?.data?.data?.map((item) => ({
              id:item?.id,
              device_imei:item?.device_imei,
              live_status:vehicle_live_status(item?.vehicle_current_status),
              icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
              last_duration:item?.last_duration,
              latitude:item?.lattitute || 0.00000,
              longtitude:item?.longitute || 0.00000,
              title: item?.vehicle_name||"TEST",
              description:item?.device_updatedtime|| "0000-00-00 00:00:00",
              device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
              color:vehicle_color(item?.vehicle_current_status),
              vehicle_current_status:item?.vehicle_current_status,
              angle:item?.angle ||0,
              speed:item?.speed||0,
              gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
              gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
              power_status : item?.power_status ? GREEN_BASE : RED_BASE,
            }));
            setMultiplevehiclesData(AllvehicleData);
          }

        }
      }
      } catch (error) {
        console.error("Error Listing.");
      }
      

    } 


    useEffect(()=>{
      
      setCurrentRole(role());
      setCurrentUser(user());
      RoleBasedUserList();
      vehicle_list(vehicle_status);
      vehicle_count();
      
      single_vehicle_live_data();      

      const interval = setInterval(() => {
        vehicle_list(vehicle_status);
      }, 3000);
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
      {key:"1",tab:"Map",content:'<Table></Table>'},
      {key:"1",tab:"Map",content:'<Table></Table>'},
      {key:"1",tab:"Map",content:'<Table></Table>'},
    ];
    // const tabs = [
    //   { key: "1", tab: <p>All-{vehilcecount?.total_vehicles||0}</p>, content: <Dashboard_vehicles status={""} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData} /> },
    //   { key: "2", tab: <p>Parking -{vehilcecount?.stop||0}</p>, content: <Dashboard_vehicles status={1} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData}/> },
    //   { key: "3", tab: <p>Idle-{vehilcecount?.idle||0}</p>, content: <Dashboard_vehicles status={2} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData}/>},
    //   { key: "4", tab: <p>Moving-{vehilcecount?.running||0}</p>, content: <Dashboard_vehicles status={3} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData}/> },
    //   { key: "5", tab: <p>No Data-{vehilcecount?.no_data||0}</p>, content: <Dashboard_vehicles status={4} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData}/> },
    //   { key: "6", tab: <p>Inactive-{vehilcecount?.inactive||0}</p>, content: <Dashboard_vehicles status={5} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData}/> },
    //   { key: "7", tab: <p>Expired-{vehilcecount?.expired||0}</p>, content: <Dashboard_vehicles status={6} Customervalue={currentCustomerUser} map_vehicles_data={multiplevehiclesData}/> },
    // ];

    const currentDistributorList = async (value) => {
      SetDealerList([]); 
      SetSubdealerList([]); 
      SetCustomerList([]); 
      const user_data = { user_id: value };
      const user_list = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
      SetDistributorList(user_list?.data?.data?.user_list);
      
    }
    // Dealer Update
    const currentDealerList = async (value) => {
      setDealerLoading(true);
      SetSubdealerList([]); 
      SetCustomerList([]); 
      const user_data = { user_id: value };
      const user_list = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
      SetDealerList(user_list?.data?.data?.user_list);
       
      setDealerLoading(false);
      
    }
    // Subdealer Update
    const currentSubDealerList = async (value) => {
      setLoading(true);
      SetSubdealerList([]);
      SetCustomerList([]);
      console.log(value);
      const user_data = { user_id: value };
      const user_list = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
      SetSubdealerList(user_list?.data?.data?.subdealer_list);  
      SetCustomerList(user_list?.data?.data?.user_list);
      setLoading(false);
    }

    const changeDealer = async (value) => {
      setLoading(true);
      setCurrentCustomerList([]);
      const user_data = { user_id: value };
      const user_list = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
      setCurrentCustomerList(user_list?.data?.data?.user_list);
      setLoading(false);
    }
    const changeSubDealer = async (value) => {
      setLoading(true);
      setCurrentCustomerList([]);
      const user_data = { user_id: value };
      const user_list = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
      
      setLoading(false);
      setCurrentCustomerList(user_list?.data?.data?.user_list);
    }
    const changeCustomer = async (value) => {
      
      setActiveKey(activeKey);
      SetSelectedCustomer(value);
      setCurrentCustomerUser(value);
      const status_vehicle = getCurrentVehicleStatus();
      const current_vehicle = getCurrentVehicle();
      const customer_input = {user_id:value};
      const customer_vehicles = await api.post("client_multi_dashboard",customer_input).then((res)=>{ return res;}).catch((err)=>{return [];});
       console.log(status_vehicle);
       if(customer_vehicles?.data?.data && status_vehicle!='')
        {
          const filteredItems = customer_vehicles?.data?.data.filter(item => item.vehicle_current_status === status_vehicle);
          if(filteredItems)
          {
            
            const device_imei = current_vehicle!=''?current_vehicle:filteredItems[0].device_imei;
            const single_vehicle_data = customer_vehicles?.data?.data.filter(item => item.device_imei === device_imei);
            const processedData = single_vehicle_data?.map((item) => ({
                id:item?.id,
                device_imei:item?.device_imei,
                live_status:vehicle_live_status(item?.vehicle_current_status),
                icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
                last_duration:item?.last_duration,
                latitude:item?.lattitute || 0.00000,
                longtitude:item?.longitute || 0.00000,
                title: item?.vehicle_name||"TEST",
                description:item?.device_updatedtime|| "0000-00-00 00:00:00",
                device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
                color:vehicle_color(item?.vehicle_current_status),
                vehicle_current_status:item?.vehicle_current_status,
                angle:item?.angle ||0,
                speed:item?.speed||0,
                gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
              gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
              power_status : item?.power_status ? GREEN_BASE : RED_BASE,
              }));
            setMultiplevehiclesData(processedData);
            setmapvehicleDate(processedData);
  
          }
        }else{
          const filteredItems = customer_vehicles?.data?.data;
          
          const processedData = filteredItems?.map((item) => ({
            id:item?.id,
            device_imei:item?.device_imei,
            live_status:vehicle_live_status(item?.vehicle_current_status),
            icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
            last_duration:item?.last_duration,
            latitude:item?.lattitute || 0.00000,
            longtitude:item?.longitute || 0.00000,
            title: item?.vehicle_name||"TEST",
            description:item?.device_updatedtime|| "0000-00-00 00:00:00",
            device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
            color:vehicle_color(item?.vehicle_current_status),
            vehicle_current_status:item?.vehicle_current_status,
            angle:item?.angle ||0,
            speed:item?.speed||0,
            gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
            gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
            power_status : item?.power_status ? GREEN_BASE : RED_BASE,
        }));
            setMultiplevehiclesData(processedData);
            
            const device_imei = currentVehicle!=''?currentVehicle:filteredItems[0].device_imei;
            const single_vehicle_data = customer_vehicles?.data?.data.filter(item => item.device_imei === device_imei);
            const singleData = single_vehicle_data?.map((item) => ({
              id:item?.id,
              device_imei:item?.device_imei,
              live_status:vehicle_live_status(item?.vehicle_current_status),
              icon_url:vehicle_icon_url(item?.vehicle_current_status)+item?.short_name+'.png',
              last_duration:item?.last_duration,
              latitude:item?.lattitute || 0.00000,
              longtitude:item?.longitute || 0.00000,
              title: item?.vehicle_name||"TEST",
              description:item?.device_updatedtime|| "0000-00-00 00:00:00",
              device_time:item?.device_updatedtime|| "0000-00-00 00:00:00",
              color:vehicle_color(item?.vehicle_current_status),
              vehicle_current_status:item?.vehicle_current_status,
              angle:item?.angle ||0,
              speed:item?.speed||0,
              gps_count:item?.gpssignal =='1'? GREEN_BASE : RED_BASE,
              gsm_count:item?.gsm_status =='1'? GREEN_BASE : RED_BASE,
              power_status : item?.power_status ? GREEN_BASE : RED_BASE,
          }));
            setmapvehicleDate(singleData);
        }
      // Set vehicle count 
      const customer_data = {user_id:value};
        const count_vehicles =  await api.post("client_vehicle_count",customer_data).then((res)=> { return res;}).catch((err)=>{return [];});
       
        setvehiclecount(count_vehicles?.data?.data);
        
    }
    const handleChange = (value,option) =>{
        const selected_user_id = value;
        const selected_role_id = option.role_id;

        switch (selected_user_id) {
          case 1:
            return getAdminList(selected_user_id);
            break;
          case 2:
            return currentDistributorList(selected_user_id);
            break;
            case 3:
              return currentDealerList(selected_user_id);
              break;
              case 4:
              return changeDealer(selected_user_id);
              case 5:
              return changeSubDealer(selected_user_id);
              break;
          default:
            break;
        }
        
    }
    
return(
    <>
        <Row style={{height:'800','margin':'0','padding':'0'}}>
            <Col xs={24} sm={24} md={24} lg={24} style={{padding:0,margin:0}}>
                <Row gutter={6} style={{padding:0,margin:0}}>
                    <Col sm={12} md={6} lg={6}  style={{padding:0,margin:0}}>
                        <Form name="customer-form" layout="vertical" size="small" style={{padding:0,margin:0}} >
                            <Row>
                              {role_id==1 && (
                                <Col md={12}>
                                <Form.Item name="admin_id" label="Admin" size="small" initialValue="" rules={[{required:true,message:'Admin Value is Required!'}]}>
                                <Select showSearch optionFilterProp="children" onChange={handleChange} placeholder="Admin" filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
                                {Array.isArray(adminList) ? (
                        adminList?.map((admin) => (
                          <Select.Option 
                            key={admin?.id}
                            role_id="2"
                            value={admin?.id}
                          >
                            {admin?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value={null} role_id="3"></Select.Option>
                      )}
                                </Select>
                                </Form.Item>
                                </Col>
                              )}
                              {(role_id==1 || role_id==2) && (
                                
                                <Col md={12}>
                                <Form.Item name="distributor_id" label="Distributor" size="small" initialValue="" rules={[{required:true,message:'Admin Value is Required!'}]}>
                                <Select  showSearch onChange={currentDealerList} size="small" placeholder="Distributor" optionFilterProp="children"  filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
                                
                                {Array.isArray(distributorList) ? (
                        distributorList?.map((distributor) => (
                          <Select.Option 
                            key={distributor?.id}
                            role_id="3"
                            value={distributor?.id}
                          >
                            {distributor?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value={null} role_id="3"></Select.Option>
                      )}
                                </Select>
                                </Form.Item>
                                </Col>
                                
                              )}
                              {(role_id==1 || role_id==2 || role_id==3) && (
                                
                                <Col md={12}>
                                <Form.Item name="dealer_id" label="Dealer" size="small" initialValue="" rules={[{required:true,message:'Dealer Value is Required!'}]}>
                                {dealerLoading ? (
        <Spin size="large" />
      ) : (<Select showSearch onChange={changeDealer} placeholder="Dealer" optionFilterProp="children"  filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      {Array.isArray(dealerList) ? (
dealerList?.map((dealer) => (
<Select.Option 
  key={dealer?.id}
  role_id="4"
  value={dealer?.id}
>
  {dealer?.name}
</Select.Option>
))
) : (
<Select.Option value={null} role_id="4"></Select.Option>
)}
      </Select>)}
                                
                                </Form.Item>
                                </Col>
                              )}
                              {(role_id==1 || role_id==2 || role_id==3 || role_id==4) && (
                                <Col md={12}>
                                <Form.Item name="subdealer_id" label="Sub Dealer" size="small" initialValue="" rules={[{required:true,message:'Subdealer Value is Required!'}]}>
                                <Select showSearch onChange={changeSubDealer} placeholder="Sub Dealer" optionFilterProp="children"  filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
                                {Array.isArray(subdealerList) ? (
                        subdealerList?.map((subdealer) => (
                          <Select.Option 
                            key={subdealer?.id}
                            role_id="5"
                            value={subdealer?.id}
                          >
                            {subdealer?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value={null} role_id="5"></Select.Option>
                      )}
                                </Select>
                                </Form.Item>
                                </Col>
                              )}
                              {(role_id==1 || role_id==2 || role_id==3 || role_id==4 || role_id==5 ) && (
                                <Col md={12}>
                                <Form.Item name="customer_id" label="Customer" size="small" initialValue="" rules={[{required:true,message:'Customer Value is Required!'}]}>
                                <Select showSearch onChange={changeCustomer} placeholder="Customer" optionFilterProp="children"  filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
                                {Array.isArray(listCustomer) ? (
                        listCustomer?.map((customer) => (
                          <Select.Option 
                            key={customer?.id}
                            role_id="6"
                            value={customer?.id}
                          >
                            {customer?.name}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option value={null} role_id="6"></Select.Option>
                      )}
                                </Select>
                                </Form.Item>
                                </Col>
                              )}
                            </Row>
                            

                        </Form>
                        <Card style={{padding:0,margin:0}}>
                            <StickyContainer style={{padding:0,margin:0}}>
                              <Col sm={24} md={24} lg={24}>
                               <Row>
                               <Col md={4}  style={{border:'1px solid',textAlign:'center',margin:'0px'}} value="" onClick={handleTabChange}><p style={{fontSize:'10px',margin:'0px'}} value="" >All</p><p style={{backgroundColor:'#0dcaf0',margin:'0px',color:'white'}}>{vehilcecount?.total_vehicles||0}</p></Col>
                              <Col md={4} style={{border:'1px solid',textAlign:'center',margin:'0px'}} value="1" onClick={handleTabChange}><p style={{fontSize:'10px',margin:'0px'}} value="1" >Parking</p><p style={{backgroundColor:'#0d6efd',margin:'0px',color:'white'}}>{vehilcecount?.stop||0}</p></Col>
                              <Col md={4} style={{border:'1px solid',textAlign:'center',margin:'0px'}} value="2" onClick={handleTabChange}><p style={{fontSize:'10px',margin:'0px'}} value="2" >Idle</p><p style={{backgroundColor:'#ffc107',margin:'0px',color:'white'}}>{vehilcecount?.idle||0}</p></Col>
                              <Col md={4} style={{border:'1px solid',textAlign:'center',margin:'0px'}} value="3" onClick={handleTabChange}><p style={{fontSize:'10px',margin:'0px'}} value="3" >Moving</p><p style={{backgroundColor:'#20c997',margin:'0px',color:'white'}}>{vehilcecount?.running||0}</p></Col>
                              <Col md={4} style={{border:'1px solid',textAlign:'center',margin:'0px'}} value="4" onClick={handleTabChange}><p style={{fontSize:'10px',margin:'0px'}} value="4" >No Data</p><p style={{backgroundColor:'#dc3545',margin:'0px',color:'white'}}>{vehilcecount?.no_data||0}</p></Col>
                              <Col md={4} style={{border:'1px solid',textAlign:'center',margin:'0px'}} value="5" onClick={handleTabChange}><p style={{fontSize:'10px',margin:'0px'}} value="5" >Inactive</p><p style={{backgroundColor:'#888d9599',margin:'0px',color:'white'}}>{vehilcecount?.inactive||0}</p></Col>
                              </Row> 
                              
                              </Col>
                              
                            {/* <Tabs activeKey={activeKey}  size='small'  onChange={handleTabChange}>
                              {tabs.map((tab) => (
                                <Tabs key={tab.key} tab={tab.tab}>
                                  {activeKey === tab.key && <div>{tab.content}</div>}
                                </Tabs>
                              ))}
                            </Tabs> */}
                             {/* <Search
      placeholder="Search Vehicle.."
      options = {multiplevehiclesData}
      onChange={onSearch}
      allowClear
      
    /> */}
    <List style={{padding:'1px',margin:'1px',fontSize:'10px',height:'700px',border:'1px',overflow: 'auto'}}
    itemLayout="horizontal"
    size='small'
    dataSource={multiplevehiclesData}
    renderItem={item => (
      <List.Item  className={item?.device_imei==live_vehicle?"active_vehicle":"normal_vehicle"} onClick={() => SingleVehicle(item?.device_imei)}  value={item?.id} actions={[ <a key="list-loadmore-more"><FontAwesomeIcon icon={faEllipsisVertical} style={{fontSize: '15px',padding:'0',color:GREEN_BASE}}/></a>]}>
        <List.Item.Meta
          avatar={ <Avatar size="small"  style={{backgroundColor:'transparent'}} icon={<CarFilled style={{ fontSize: '20px',padding:'0',color: item.color } }/>}/>}
          title={<span style={{fontSize:'12px'}}>{item.title}</span>}
          description={<span style={{fontSize:'10px'}}>{item.description}</span>}
        />
        <Row style={{padding:0}}>
          <Col className='ml-13'>
            <h6>{item.speed} KMPH</h6>
          </Col >
          <Col className='ml-2'>
            <Tooltip title="GSM Status">
            <WifiOutlined style={{fontSize: '15px',color:item.gps_count}} />
            </Tooltip>
          </Col>
          <Col className='ml-2'>
          <Tooltip title="GPS Status">
            <FontAwesomeIcon icon={faLocationCrosshairs} style={{fontSize: '15px',color:item.gsm_count}}/>
          </Tooltip>
            </Col>
          <Col className='ml-2'>
          <Tooltip title="Power Status">
          <FontAwesomeIcon icon={faPlug} style={{fontSize: '15px',color: item.power_status}} />
          </Tooltip>
          </Col>
        </Row>
      </List.Item>
    )}
  />
</StickyContainer>
</Card>
</Col>
                    <Col sm={12} md={18} lg={18}>
                    {loading?(<Spin></Spin>):
                    <LiveTracking data={mapvehicleDate}/>
    }
                    </Col>
                </Row>
            </Col>
        </Row> 
              
    </>
)
}

export default Admin;