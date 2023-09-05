import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Drawer,
  Select,
  Input,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import moment from "moment/moment";
import api from "configs/apiConfig";

const { Option } = Select;

const Device = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const tableColumns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicle_name",
    },
    {
      title: "Device Make",
      dataIndex: "device_make",
    },
    {
      title: "Device Model",
      dataIndex: "device_model",
    },
    {
      title: "Installation Date",
      dataIndex: "created_at",
    },
    {
      title: "Point Recharge",
      dataIndex: "point_recharge",
    },
    {
      title: "Customer Recharge",
      dataIndex: "customer_recharge",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  const dateFormat = "YYYY-MM-DD";
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Card title="Device List">
        <Form name="device_list_form" layout="horizontal">
          <Row gutter={6}>
            <Col span={4}>
              <FormItem name="admin_id">
                <Select placeholder="Admin">
                  <Option value="1">Acute Admin</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem name="distributor_id">
                <Select placeholder="Distributor">
                  <Option value="1">Acute Distributor</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem name="dealer_id">
                <Select placeholder="Dealer">
                  <Option value="1">Acute Dealer</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem name="subdealer_id">
                <Select placeholder="Subdealer">
                  <Option value="1">Acute Dealer</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem name="customer_id">
                <Select placeholder="Customer">
                  <Option value="1">Customer 1</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={showDrawer}
                icon={<PlusOutlined />}
              >
                {" "}
                Add
              </Button>
            </Col>
          </Row>
        </Form>
        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          width={720}
          open={open}
          title="Create a new Device"
        >
          <h5>Licence Details:</h5>
          <Form form={form} name="device_form">
            <Row gutter={6}>
              <Col sm={12} md={24} lg={24} xxl={24}>
                <Row gutter={6}>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="plan_id"
                      rules={[
                        { required: true, message: "Please Select Plan" },
                      ]}
                    >
                      <Select placeholder="Select Plan">
                        <Option value="1">BASIC PLAN - 3 MONTHS</Option>
                        <Option value="2">BASIC PLAN - 6 MONTHS</Option>
                        <Option value="3">BASIC PLAN - 1 YEAR</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="licence_id"
                      rules={[
                        { required: true, message: "Please Select Licence" },
                      ]}
                    >
                      <Select placeholder="Select Licence">
                        <Option value="1">SWTLIC#0001</Option>
                        <Option value="2">SWTLIC#0002</Option>
                        <Option value="3">SWTLIC#0003</Option>
                        <Option value="4">SWTLIC#0004</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <h5>Device Details :</h5>
                <Row gutter={6}>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="device_make_id"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Device Make",
                        },
                      ]}
                    >
                      <Select placeholder="Select Make">
                        <Option value="1">CONCOX</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="device_model_id"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Device Model",
                        },
                      ]}
                    >
                      <Select placeholder="Select Model">
                        <Option value="1">8001</Option>
                        <Option value="2">8002</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="device_imei"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Device IMEI",
                        },
                      ]}
                    >
                      <Select placeholder="Select Device IMEI">
                        <Option value="1">8001</Option>
                        <Option value="2">8002</Option>
                      </Select>
                    </FormItem>
                  </Col>

                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="device_uid"
                      rules={[
                        { required: true, message: "Please Enter Device UID" },
                      ]}
                    >
                      <Input type="text" placeholder="Device UID"></Input>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="device_ccid"
                      rules={[
                        { required: true, message: "Please Enter Device CCID" },
                      ]}
                    >
                      <Input
                        type="text"
                        name="device_ccid"
                        placeholder="Device CCID"
                      ></Input>
                    </FormItem>
                  </Col>

                  <Col sm={6} md={12} lg={12} xxl={12}>
                    <FormItem name="device_description">
                      <Input
                        type="textarea"
                        name="device_description"
                        placeholder="Device Description"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
                <h5>SIM Details :</h5>
                <Row gutter={6}>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="network_provider_id"
                      rules={[
                        {
                          required: true,
                          message: "Please select Networkprovider",
                        },
                      ]}
                    >
                      <Select placeholder="Select Network Provider">
                        <Option value="1">AIRTEL</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="sim_number1"
                      rules={[
                        { required: true, message: "Please Enter SIM Number" },
                      ]}
                    >
                      <Input
                        type="text"
                        name="sim_number1"
                        placeholder="SIM Number1"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="sim_number2"
                      rules={[
                        { required: true, message: "Please Enter SIM Number2" },
                      ]}
                    >
                      <Input
                        type="text"
                        name="sim_number2"
                        placeholder="SIM Number2"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="sim_imei_number"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter SIM IMEI Number",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        name="sim_imei_number"
                        placeholder="SIM IMEI Number"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
                <h5>Vehicle Details :</h5>
                <Row gutter={6}>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="vehicle_type_id"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Vehicle Type",
                        },
                      ]}
                    >
                      <Select placeholder="Vehicle Type">
                        <Option value="1">Car</Option>
                        <Option value="2">Bike</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem
                      name="vehicle_name"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Vehicle Name",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        name="vehicle_name"
                        placeholder="Vehicle Name"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col sm={3} md={6} lg={6} xxl={6}>
                    <FormItem>
                      <DatePicker
                        required
                        allowClear={false}
                        defaultValue={moment()}
                        format={dateFormat}
                        placeholder="Installation Date"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </Drawer>
        <Table tableColumns={tableColumns}></Table>
      </Card>
    </div>
  );
};

export default Device;
