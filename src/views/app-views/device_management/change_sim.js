import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Input,
  Form,
  Row,
  Col,
  Space,
  notification,
} from "antd";
import api from "configs/apiConfig";

const { Option } = Select;

const ChangeSim = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [networkOptions, setNetworkOptions] = useState([]);

  useEffect(() => {
    async function fetchNetworkOptions() {
      try {
        const response = await api.get("network");
        if (response.data.success) {
          setNetworkOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }

    fetchNetworkOptions();
  }, []);

  console.log(parentToChild);
  const openNotification = (type, message, description) => {
    notification[type]({ message, description });
  };
  console.log(parentToChild);
  const onFinish = async (values) => {
    const { sim_mob_no1, network_id, sim_imei_no } = values;
    const { parentFunction } = props;

    try {
      const data = {
        network_id,
        sim_imei_no,
        sim_mob_no1,
        sim_mob_no2: values.sim_mob_no2,
        ...parentToChild,
      };

      await api.post("change_sim", data);
      form.resetFields();
      parentFunction();
      openNotification("success", "Sim", "Sim Inserted Successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const validationErrors = error.response.data.message || {};
        const errorMessage = {
          sim_imei_no: "Sim CCID No is Already Exists",
          sim_mob_no1: "Sim Mobile Number-1 is Already Exists",
        }[Object.keys(validationErrors)[0]];

        if (errorMessage) {
          openNotification("info", errorMessage);
        }
      }
    }
  };

  return (
    <Form
      form={form}
      size="small"
      name="registrationForm"
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            label="Network"
            name="network_id"
            rules={[{ required: true, message: "Please Select a Network" }]}
          >
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {Array.isArray(networkOptions) ? (
                networkOptions.map((network) => (
                  <Option key={network.id} value={network.id}>
                    {network.network_provider_name}
                  </Option>
                ))
              ) : (
                <Option value="Loading" disabled>
                  Loading...
                </Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Sim CCID"
            name="sim_imei_no"
            rules={[{ required: true, message: "Please enter a Sim CCID" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Primary Number"
            name="sim_mob_no1"
            rules={[
              { required: true, message: "Please enter a Primary Number" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Secondary Mobile No" name="sim_mob_no2">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle">
        <Col span={12}>
          <Form.Item>
            <Space wrap>
              <Button type="primary" shape="round" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangeSim;
