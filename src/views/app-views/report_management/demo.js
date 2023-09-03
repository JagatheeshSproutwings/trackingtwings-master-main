import React,{useState,useEffect} from 'react'
import { Table, Button, Row,Col,Card, Drawer, Select, Input, Form, Space,Checkbox,DatePicker,notification } from "antd";
import IdleReport from './idle_report'
import ParkingReport from './parking_report';
import PlaybackReport from './playback_report';
import KeyonKeyOffReport from './keyon_keyoff_report';
import { useSelector } from "react-redux";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
const { Option } = Select;
const { RangePicker } = DatePicker;
const NotificationType = 'success' | 'info' | 'warning' | 'error';
const Report = () => {
    // Use State Values 
    const [isLoading, setIsLoading] = useState(false);
    const [user_role,SetUserRole] = useState("");
    const [currentReport,SetReport] = useState("");
    const [currentUser,SetCurrentUser] = useState(localStorage.getItem("id")||"");
    const [currentRole,SetCurrentRole] = useState(localStorage.getItem("role")||"");
    const [currentCustomer,SetCurrentCustomer] = useState("");
    const [userList,SetUserList] = useState([]);
    const [adminList,SetAdminList] = useState([]);
    const [distributorList,SetDistributorList] = useState([]);
    const [dealerList,SetDealerList] = useState([]);
    const [subdealerList,SetSubdealerList] = useState([]);
    const [customerList,SetCustomerList] = useState([]);
    const token = useSelector((state) => state.auth);

    const handleShowStatus = (value) => {
        SetCurrentCustomer(value);
      };
      const getUserList = async () => {
        console.log("User List Data Begins..");
        console.log(currentUser);
        console.log(currentRole);
        const user_data = {user_id:currentUser};
        const vehicle_data = await api.post("role_based_user_list",user_data).then((res) => {return res}).catch((err) => {return []});
        
        // Super Admin
        if(currentRole==1) 
        {
            console.log("Super Admin");
            SetAdminList(vehicle_data?.data?.data?.user_list);
        }
        if(currentRole==2) 
        {
            console.log("Admin");
            SetDistributorList(vehicle_data?.data?.data?.user_list);
               
        }
        if(currentRole==3) 
        {
            console.log("Distributor");
            console.log(vehicle_data?.data?.data);
            SetDealerList(vehicle_data?.data?.data?.user_list);
            console.log(dealerList);
        }
        if(currentRole==4) 
        {
            console.log("Dealer");
            SetCustomerList(vehicle_data?.data?.data?.user_list);
            SetSubdealerList(vehicle_data?.data?.data?.subdealer_list);
        }
        if(currentRole==5) 
        {
            console.log("Subdealer");
            SetCustomerList(vehicle_data?.data?.data?.user_list);
        }
        // SetCustomerId(user_data.data.message);
      };

    const handleReport = (report) => {
        
        if(currentCustomer!='')
        {
            SetReport(report);
        }
      };

      const user = () => {
        return localStorage.getItem("id");
      };
      const role = () => {
        return localStorage.getItem("role");
      };
      const admin = () => {
        return localStorage.getItem("admin_id");
      };
      const distributor = () => {
        return localStorage.getItem("distributor_id");
      };
      const dealer = () => {
        return localStorage.getItem("dealer_id");
      };
      const subdealer = () => {
        return localStorage.getItem("subdealer_id");
      }; 
      const handleUser  = async (value,option) =>{
        if(value!='')
        {
            const role_id = option.role_id;
            const user_get_data = {user_id:value};
            const user_details =  await api.post("role_based_user_list",user_get_data).then((res) => {return res}).catch((err) => {return []});
            if(role_id==2)
            {
                SetDistributorList(user_details?.data?.data?.user_list);
            }
            if(role_id==3)
            {
                SetDealerList(user_details?.data?.data?.user_list);
            }
            if(role_id==4)
            {
                SetSubdealerList(user_details?.data?.data?.user_list);
            }
            if(role_id==5)
            {
                SetCustomerList(user_details?.data?.data?.user_list);
            }
            console.log(user_details?.data?.data?.user_list);
        }
      }
      const handleAdmin = (value,option) => {
        if(value!='')
        {
            const role_id = option.role_id;
            const user_get_data = {user_id:value};
            
            const user_details =   api.post("role_based_user_list",user_get_data).then((res) => {return res}).catch((err) => {return []});
            SetDistributorList(user_details?.data?.data?.user_list);
            
            SetDealerList([]);
        }
      }
      const handleDistributor = (value,option) => {
        if(value!='')
        {
            const role_id = option.role_id;
            const user_get_data = {user_id:value};
            const user_details =   api.post("role_based_user_list",user_get_data).then((res) => {return res}).catch((err) => {return []});
            SetDealerList(user_details?.data?.data?.user_list);
            SetSubdealerList([]);
        }
      }
      const handleDealer = (value,option) => {
        if(value!='')
        {
            const role_id = option.role_id;
            const user_get_data = {user_id:value};
            const user_details =   api.post("role_based_user_list",user_get_data).then((res) => {return res}).catch((err) => {return []});
            SetCustomerList(user_details?.data?.data?.user_list);
            SetSubdealerList(user_details?.data?.data?.subdealer_list);
        }
      }
      useEffect(() => {
        
        if(role()== 6 && user()!='')
        {
            SetCurrentCustomer(user());
        }
        
        SetCurrentUser(user());
        SetCurrentRole(role());
        getUserList();
    }, []);
    const newLocal = <Card> 
        <Form layout="vertical" size='small'>
            {(currentRole==1)  && (
            <Form.Item  label="Admin" name="admin_id" size='small' rules={[
                {
                    required: true,
                },
            ]}>
                <Select onChange = {handleAdmin}>
                {Array.isArray(adminList) ? (
                  adminList.map((admin) => (
                    <Select.Option role_id="2"  value={admin?.id}>{admin?.name}</Select.Option>
                  ))) : (
                    <Select.Option value=""></Select.Option>
                  )}
                </Select>
            </Form.Item> )}

            {(currentRole==1 || currentRole==2)  && (
            <Form.Item label="Distributor" name="dealer_id" size='small' rules={[
                {
                    required: true,
                },
            ]}>
                <Select onChange = {handleDistributor}>
                {Array.isArray(distributorList) ? (
                  distributorList.map((distributor) => (
                    <Select.Option value={distributor?.id}  role_id="3">{distributor?.name}</Select.Option>
                  ))) : (
                    <Select.Option value=""></Select.Option>
                  )}
                </Select>
            </Form.Item>)}

            {(currentRole==1 || currentRole==2 || currentRole==3)  && (
            <Form.Item label="Dealer" name="dealer_id" size='small' onChange = {handleDealer} rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                
                    <Select.Option role_id="4"  value={dealer?.id}>{dealer?.name}</Select.Option>
                  
                    <Select.Option value=""></Select.Option>
                  
                    
                </Select>
            </Form.Item>
            )}
            {(currentRole==1 || currentRole==2 ||currentRole==3 || currentRole==4)  && (
            <Form.Item label="SubDealer" name="subdealer_id" size='small' rules={[
                {
                    required: true,
                },
            ]}>
                <Select onChange = {handleUser}>
                {Array.isArray(subdealerList) ? (
                  subdealerList.map((sub_dealer) => (
                    <Select.Option role_id="5"  value={sub_dealer?.id}>{sub_dealer?.name}</Select.Option>
                  ))) : (
                    <Select.Option value=""></Select.Option>
                  )}
                </Select>
            </Form.Item>
            )}
            {(currentRole==1 || currentRole==2 ||currentRole==3 || currentRole==4 || currentRole==5)  && (
            <Form.Item label="Customer"  name="customer_id" size='small' rules={[
                {
                    required: true,
                },
            ]}>
                <Select onChange={handleShowStatus}>
                {Array.isArray(subdealerList) ? (
                  subdealerList.map((sub_dealer) => (
                    <Select.Option role_id="6"  value={sub_dealer?.id}>{sub_dealer?.name}</Select.Option>
                  ))) : (
                    <Select.Option value=""></Select.Option>
                  )}
                </Select>
            </Form.Item> )}
            
            <Form.Item label="Reports" rules={[
                {
                    required: true,
                },
            ]} name="report_id">
                <Select onChange={handleReport}>
                <Select.Option value="1">Idle Report</Select.Option>
                <Select.Option value="2">Parking Report</Select.Option>
                <Select.Option value="3">Playback Report</Select.Option>
                <Select.Option value="4">Keyon KeyOff Report</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    </Card>;



  return (
    
    <>
    
    <Row gutter={6}>
        <Col xs={24} sm={24} xl={4} md={4} lg={4} xxl={4}>
            {newLocal}
        </Col>
        <Col xs={24} sm={24} xl={20} md={20} lg={20} xxl={20}>
        {(() => {
        switch (currentReport) {
          case '1':
            return <IdleReport/>;
          case '2':
            return <ParkingReport/>;
          case '3':
            return <PlaybackReport/>;
            case '4':
                return <KeyonKeyOffReport/>
          default:
            return "";
        }
      })()}
        </Col>
    </Row>
    </>
  )
}

export default Report