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
    const [currentUser,SetCurrentUser] = useState("");
    const [currentRole,SetCurrentRole] = useState("");
    const token = useSelector((state) => state.auth);
    
    const handleReport = (report) => {
        if(currentUser!='')
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
       
    const newLocal = <Card>
        <Form layout="vertical" size='small'>
            {currentRole==1 || currentRole==2  && (
            <Form.Item  label="Admin" name="admin_id" size='small' rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                    <Select.Option value="1">Acute</Select.Option>
                </Select>
            </Form.Item> )}
            {currentRole==2 || currentRole==3  && (
            <Form.Item label="Distributor" name="dealer_id" rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                    <Select.Option value="1">Acute Distributor</Select.Option>
                </Select>
            </Form.Item>)}

            {currentRole==3 || currentRole==4  && (
            <Form.Item label="Dealer" name="dealer_id" rules={[
                {
                    required: true,
                },
            ]}>
                <Select defaultValue="1">
                    <Select.Option value="1">Acute Dealer</Select.Option>
                </Select>
            </Form.Item>
            )}
            {currentRole==3 || currentRole==4  && (
            <Form.Item label="SubDealer" name="subdealer_id" rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                    <Select.Option value="1">Acute Sub Dealer</Select.Option>
                </Select>
            </Form.Item>
            )}

            <Form.Item label="Customer" defaultValue={currentUser} name="customer_id" rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                    <Select.Option value="10">{currentUser}</Select.Option>
                </Select>
            </Form.Item>
            
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

    useEffect(() => {
        console.log(role());
        
        if(role()== 6 && user()!='')
        {
            console.log(user());
            SetCurrentUser(user());
        }
        SetCurrentRole(role());
    }, []);

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