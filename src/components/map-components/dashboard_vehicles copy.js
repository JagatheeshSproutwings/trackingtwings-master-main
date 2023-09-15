import React,{useState,useEffect} from 'react'
import { Table,Row,Col,List,Avatar,Badge,Skeleton } from 'antd'
import { CarFilled,WifiOutlined } from '@ant-design/icons';
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE,RED_BASE,ORANGE_BASE } from 'constants/ThemeConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical,faLocationCrosshairs,faPlug } from '@fortawesome/free-solid-svg-icons'
import api from 'configs/apiConfig'

function Dashboard_vehicles({status}) {
const [multipleVehicles,setMultiVehicles] = useState([]);
const [vehicle_status,setvehicleStatus] = useState(status);
const [showHeader, setShowHeader] = useState(false);
const [loading, setLoading] = useState(false);
let vehicle_icon_color,output;
const tableProps = {
    loading,
    showHeader,
  };
  const handleSwitch = (condition) => {
    let output;

    switch (condition) {
      case "1":
        return  BLUE_BASE;
        break;
      case "2":
        return GOLD_BASE;
        break;
      case "3":
        return GREEN_BASE;
        break;
        case "4":
          return RED_BASE;
        break;
        case "5":
          return GRAY_DARK;
        break;
        case "6":
          return  ORANGE_BASE;
        break;
      default:
        return GRAY_DARK;
        break;
    }

  };
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
    // if(value==1)
    // {
    //   return BLUE_BASE;
    // }
    // if(value==4)
    // {
    //   return GRAY_DARK;
    // }
    // if(value==3)
    // {
    //   return GREEN_BASE;
    // }
  }
  
  const SingleVehicle = (value) => {
    console.log(value);
  }
  const  vehicle_list = async (status) =>{

    const multiple_vehicles_data = await api.get("multi_dashboard").then((res) => { return res;}).catch((err) => {console.log(err)});
    if(multiple_vehicles_data?.data?.data && vehicle_status!='')
    {
      const filteredItems = multiple_vehicles_data?.data?.data.filter(item => item.vehicle_current_status === vehicle_status);
      
        const processedData = filteredItems?.map((item) => ({
          id:item?.id,
          title: item?.vehicle_name||"TEST",
          description:item?.device_updatedtime|| "0000-00-00 00:00:00",
          color:vehicle_color(item?.vehicle_current_status),
          speed:item?.speed||0,
          gps_count:20,
          gsm_count:15,
        }));
      setMultiVehicles(processedData);
    }
    else{
      const filteredItems = multiple_vehicles_data?.data?.data;
      
        const processedData = filteredItems?.map((item) => ({
          id:item?.id,
          title: item?.vehicle_name||"TEST",
          description:item?.device_updatedtime|| "0000-00-00 00:00:00",
          color:vehicle_color(item?.vehicle_current_status),
          speed:item?.speed||0,
          gps_count:20,
          gsm_count:15,
        }));
      setMultiVehicles(processedData);
    }
  } 

  useEffect(()=>{
    vehicle_list(status);
    const interval = setInterval(() => {
      vehicle_list(status);
    }, 2000);
    return () => {
      clearInterval(interval);
     };
  },[])
  
  return (
    <>
    <List style={{padding:0,margin:1,fontSize:'10px',border:'1px'}}
    itemLayout="horizontal"
    size='small'
    dataSource={multipleVehicles}
    renderItem={item => (
      <List.Item  onClick={SingleVehicle} value={item?.id} actions={[ <a key="list-loadmore-more"><FontAwesomeIcon icon={faEllipsisVertical} style={{fontSize: '15px',padding:'0',color:GREEN_BASE}}/></a>]}>
        <List.Item.Meta
          avatar={ <Avatar size="small"  style={{backgroundColor:'transparent'}} icon={<CarFilled style={{ fontSize: '20px',padding:'0',color: item.color } }/>}/>}
          title={<span style={{fontSize:'12px'}}>{item.title}</span>}
          description={<span style={{fontSize:'10px'}}>{item.description}</span>}
        />
        <Row style={{padding:0}}>
          <Col className='ml-13'>
            <h6>{item.speed} KMPH </h6>
          </Col >
          <Col className='ml-2'>
            <WifiOutlined style={{fontSize: '15px',color:RED_BASE}} />
          </Col>
          <Col className='ml-2'>
            <FontAwesomeIcon icon={faLocationCrosshairs} style={{fontSize: '15px',color:GREEN_BASE}}/>
          </Col>
          <Col className='ml-2'>
          <FontAwesomeIcon icon={faPlug} style={{fontSize: '15px',color: RED_BASE}} />
          </Col>
        </Row>
        
      </List.Item>

    )}
  />
    </>
  )
}

export default Dashboard_vehicles