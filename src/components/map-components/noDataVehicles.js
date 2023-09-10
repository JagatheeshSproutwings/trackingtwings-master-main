import React,{useState,useEffect} from 'react'
import {Table,Row,Col,List,Avatar,Badge,Skeleton} from 'antd'
import { CarFilled,WifiOutlined } from '@ant-design/icons';
import { BLUE_BASE, GOLD_BASE, GRAY_DARK, GREEN_BASE } from 'constants/ThemeConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'assets/styles/multi_dashboard.css'
import api from 'configs/apiConfig'
import { faEllipsisVertical,faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'

const NoDataVehicles = () => {
  const [multi_idle_vehicles,setIdleVehicles] = useState([]);
  const [vehicle_status,setvehicleStatus] = useState(4);
  useEffect(()=>{
    idle_vehicle_list();
    console.log(vehicle_status);
  },[])

  const  idle_vehicle_list = async (value) =>{
  
    const multiple_vehicles_data = await api.get("multi_dashboard").then((res) => { return res;}).catch((err) => {console.log(err)});
    console.log(multiple_vehicles_data?.data?.data);

    if(multiple_vehicles_data?.data?.data && vehicle_status!='')
    {
      const filteredItems = multiple_vehicles_data?.data?.data.filter(item => item.vehicle_current_status === vehicle_status);
      console.log(filteredItems);
        const processedData = filteredItems.map((item) => ({
          id:item?.id,
          title: item?.vehicle_name||"TEST",
          description:item?.device_updatedtime|| "0000-00-00 00:00:00",
          color:GOLD_BASE,
          speed:item?.speed||0,
          gps_count:20,
          gsm_count:15,
        }));
        setIdleVehicles(processedData);
    }
  } 

  return (
    <div  style={{padding:0,margin:1}}>
      <List style={{padding:0,margin:1,fontSize:'10px',border:'1px'}}
    itemLayout="horizontal"
    size='small'
    dataSource={multi_idle_vehicles}
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }}
    renderItem={item => (
      <List.Item  actions={[ <a key="list-loadmore-more"><FontAwesomeIcon icon={faEllipsisVertical} style={{fontSize: '15px',padding:'0',color:GREEN_BASE}}/></a>]}>
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
        </Row>
      </List.Item>
    )}
  />
    </div>
  )
}

export default NoDataVehicles