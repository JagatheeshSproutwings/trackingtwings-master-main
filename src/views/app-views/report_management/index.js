import React,{useState,useEffect} from 'react'
import { Table, Button, Row,Col,Card, Drawer, Select, Input, Form, Space,Checkbox,DatePicker } from "antd";
import IdleReport from './idle_report'
import ParkingReport from './parking_report';
import PlaybackReport from './playback_report';
import KeyonKeyOffReport from './keyon_keyoff_report';
import { useSelector } from "react-redux";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
const { Option } = Select;
const { RangePicker } = DatePicker;
const Report = () => {
    // Use State Values 
    const [isLoading, setIsLoading] = useState(false);
    const [user_role,SetUserRole] = useState("");
    const token = useSelector((state) => state.auth);
    
    const newLocal = <Card>
        <Form layout="vertical" size='small'>
            <Form.Item labelCol={{
          span: 4,
        }} label="Admin" size='small' rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Distributor" rules={[
                {
                    required: true,
                },
            ]}>
                <Select >
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Dealer" rules={[
                {
                    required: true,
                },
            ]}>
                <Select defaultValue="demo">
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="SubDealer" rules={[
                {
                    required: true,
                },
            ]}>
                <Select defaultValue="demo">
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Customer" rules={[
                {
                    required: true,
                },
            ]}>
                <Select defaultValue="demo">
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Reports" rules={[
                {
                    required: true,
                },
            ]}>
                <Select>
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
            
            <IdleReport/>
            <ParkingReport/>
            <PlaybackReport/>
            <KeyonKeyOffReport/>
        </Col>
    </Row>
    </>
  )
}

export default Report