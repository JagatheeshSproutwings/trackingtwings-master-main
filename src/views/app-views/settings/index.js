import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Select,
  DatePicker,
  Form,
  Input,
  Row,
  Col,
  Alert,
} from "antd";
import { message } from "antd";
import Flex from "components/shared-components/Flex";
import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import api from "configs/apiConfig";
import { Excel } from "antd-table-saveas-excel";

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const Configuration = () => {
  const [idleList, setIdleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState("All");
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function fetchVehicleOptions() {
      try {
        const response = await api.get("vehicle_list");
        if (response.data.success) {
          setVehicleOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      } catch (error) {
        console.error("Error fetching vehicle options:", error);
      }
    }

    fetchVehicleOptions();
  }, []);

  const handleVehicleIdChange = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleSearchClick = async () => {
    // Log the actual selected values

    setIsLoading(false);

    // Perform additional actions based on the selected values
  };

  const onFinish = async (values) => {
    console.log("Form values:", values);

    try {
      const response = await api.post("config/store", values);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
    // Here you can perform further actions with the form values
    message.success("Form submitted successfully!");
  };

  return (
    <>
      <Card title="Configuration">
        <div className="container">
          <Form name="customer_add" onFinish={onFinish}>
            <Row gutter={16} className="form-row">
              <Col span={8}>
                <Item label="Vehicle Number" name="vehicle_id">
                  <Select
                    defaultValue="All"
                    style={{ minWidth: 150 }}
                    name="vehicle_id"
                    placeholder="Vehicle"
                    onChange={handleVehicleIdChange}
                    value={selectedVehicleId}
                  >
                    <Option value="All">All</Option>
                    {Array.isArray(vehicleOptions) ? (
                      vehicleOptions.map((vehicle) => (
                        <Option key={vehicle.id} value={vehicle.id}>
                          {vehicle.vehicle_name}
                        </Option>
                      ))
                    ) : (
                      <Option value="Loading">Loading...</Option>
                    )}
                  </Select>
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Parking Alert Time"
                  name="parking_alert_time"
                  rules={[
                    {
                      message: "Parking Alert Time is Required!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Parking Alert Time" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Idle Alert Time"
                  name="idle_alert_time"
                  rules={[{ message: "Idle Alert Time is Required!" }]}
                >
                  <Input type="number" placeholder="Idle Alert Time" />
                </Item>
              </Col>
            </Row>
            <Row gutter={16} className="form-row">
              <Col span={8}>
                <Item
                  label="Speed Limit"
                  name="speed_limit"
                  rules={[{ message: "Speed Limit is Required!" }]}
                >
                  <Input type="number" placeholder="Speed Limit" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Expected Mileage"
                  name="expected_mileage"
                  rules={[
                    {
                      message: "Expected Mileage is Required!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Expected Mileage" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Idle RPM"
                  name="idle_rpm"
                  rules={[{ message: "Idle RPM is Required!" }]}
                >
                  <Input type="number" placeholder="Idle RPM" />
                </Item>
              </Col>
            </Row>
            <Row gutter={16} className="form-row">
              <Col span={8}>
                <Item
                  label="Maximum RPM"
                  name="max_rpm"
                  rules={[{ message: "Maximum RPM is Required!" }]}
                >
                  <Input type="number" placeholder="Maximum RPM" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Temp Low"
                  name="temp_low"
                  rules={[{ message: "Temp Low is Required!" }]}
                >
                  <Input type="number" placeholder="Temp Low" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Temp High"
                  name="temp_high"
                  rules={[{ message: "Temp High is Required!" }]}
                >
                  <Input type="number" placeholder="Temp High" />
                </Item>
              </Col>
            </Row>
            <Row gutter={16} className="form-row">
              <Col span={8}>
                <Item
                  label="Fuel Fill Limit"
                  name="fuel_fill_limit"
                  rules={[{ message: "Fuel Fill Limit is Required!" }]}
                >
                  <Input type="number" placeholder="Fuel Fill Limit" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Fuel Dip Limit"
                  name="fuel_dip_limit"
                  rules={[{ message: "Fuel Dip Limit is Required!" }]}
                >
                  <Input type="number" placeholder="Fuel Dip Limit" />
                </Item>
              </Col>
              {/* Add similar columns for other fields */}
            </Row>
            <Row gutter={16} className="form-row">
              <Col span={24}>
                <Item name="submit">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Item>
              </Col>
            </Row>
          </Form>
          {isSubmitted && (
            <div style={{ marginTop: "16px" }}>
              <Alert message="Form submitted successfully!" type="success" />
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default Configuration;
