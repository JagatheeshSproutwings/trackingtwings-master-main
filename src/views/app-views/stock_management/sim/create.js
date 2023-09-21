import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Select,
  Input,
  Form,
  Row,
  Col,
  Space,
  DatePicker,
  notification,
} from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
const dateFormat = "YYYY-MM-DD";

const { Option } = Select;

const Create = (props) => {
  const [form] = Form.useForm();

  const [selectedNetworkId, setselectedNetworkId] = useState();
  const [networkOptions, setNetworkOptions] = useState([]);

  const handleNetworkIdChange = (roleID) => {
    setselectedNetworkId(roleID);
  };

  useEffect(() => {
    fetchNetworkOptions(setNetworkOptions);
  }, []);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const onFinish = async (values) => {
    const data = {
      network_id: values.network_id,
      sim_imei_no: values.sim_imei_no,
      sim_mob_no1: values.sim_mob_no1,
      sim_mob_no2: values.sim_mob_no2,
    };

    try {
      const valid_from = new Date(values["valid_from"]);
      data["valid_from"] = valid_from.toISOString().split("T")[0];
      const valid_to = new Date(values["valid_to"]);
      data["valid_to"] = valid_to.toISOString().split("T")[0];

      await api.post("sim/store", data);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "Sim", "Sim Inserted Successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("sim_imei_no")) {
            openNotification(
              "info",
              "Sim CCID",
              "Given Sim CCID No is Already Exists"
            );
          }
          if (validationErrors.hasOwnProperty("sim_mob_no1")) {
            openNotification(
              "info",
              "Sim Mobile Number-1",
              "Given Sim Mobile Number-1 is Already Exists"
            );
          }
        }
      }
    }
  };

  // Define the functions outside the component
  async function fetchNetworkOptions(setNetworkOptions) {
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

  return (
    <Row gutter={6}>
      <Col>
        <Card title="New Sim">
          <Flex>
            <div className="container">
              <Form
                form={form}
                size="small"
                name="registrationForm"
                onFinish={onFinish}
                layout="vertical"
              >
                <Row gutter={[8, 8]}>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      size="small"
                      label="Network"
                      name="network_id"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a Network",
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        onChange={handleNetworkIdChange}
                        value={selectedNetworkId}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      size="small"
                      label="Sim CCID"
                      name="sim_imei_no"
                      id="sim_imei_no"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Sim CCID",
                        },
                      ]}
                    >
                      <Input id="sim_imei_no" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      size="small"
                      label="Primary Number"
                      name="sim_mob_no1"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Primary Number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      size="small"
                      label="Secondary Mobile No"
                      name="sim_mob_no2"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col sm={12} md={12} lg={12}>
                    <Form.Item name="valid_from" label="Valid From">
                      <DatePicker
                        style={{ width: "100%", fontSize: "16px" }}
                        allowClear={false}
                        format={dateFormat}
                      ></DatePicker>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item name="valid_to" label="Valid To">
                      <DatePicker
                        style={{ width: "100%", fontSize: "16px" }}
                        allowClear={false}
                        format={dateFormat}
                      ></DatePicker>
                    </Form.Item>
                  </Col>
                </Row>

                <Row align={"middle"}>
                  <Col span={12}>
                    <Form.Item>
                      <Space wrap>
                        <Button type="primary" shape="round" htmlType="submit">
                          Save
                        </Button>
                        <Button type="primary" shape="round">
                          Back
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default Create;
