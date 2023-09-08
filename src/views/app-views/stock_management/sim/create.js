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
} from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
import moment from "moment";
const dateFormat = "YYYY-MM-DD";

const { Option } = Select;

export default function Create() {
  const [form] = Form.useForm();

  const [selectedNetworkId, setselectedNetworkId] = useState();
  const [networkOptions, setNetworkOptions] = useState([]);

  const handleNetworkIdChange = (roleID) => {
    setselectedNetworkId(roleID);
  };

  useEffect(() => {
    fetchNetworkOptions(setNetworkOptions);
  }, []);

  const onFinish = async (values) => {
    document.getElementById("imei_er_span").textContent = "";
    document.getElementById("mob1_er_span").textContent = "";
    document.getElementById("mob2_er_span").textContent = "";

    const validFrom = moment(values.valid_from).format("YYYY-MM-DD");
    const validTo = moment(values.valid_to).format("YYYY-MM-DD");

    const data = {
      network_id: values.network_id,
      sim_imei_no: values.sim_imei_no,
      sim_mob_no1: values.sim_mob_no1,
      sim_mob_no2: values.sim_mob_no2,
      valid_from: validFrom,
      valid_to: validTo,
    };

    try {
      const valid_from = new Date(values["valid_from"]);
      values["valid_from"] = valid_from.toISOString().split("T")[0];
      const valid_to = new Date(values["valid_to"]);
      values["valid_to"] = valid_to.toISOString().split("T")[0];

      await api.post("sim/store", data);

      alert("Sim Saved Successfully");

      form.resetFields();

      document.getElementById("sim_mob_no1").value = "";
      document.getElementById("sim_mob_no2").value = "";
      document.getElementById("valid_from").value = "";
      document.getElementById("valid_to").value = "";
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("sim_imei_no")) {
            console.log(validationErrors.name);
            document.getElementById("imei_er_span").textContent =
              validationErrors.sim_imei_no;
          }
          if (validationErrors.hasOwnProperty("sim_mob_no1")) {
            console.log(validationErrors.email);
            document.getElementById("mob1_er_span").textContent =
              validationErrors.sim_mob_no1;
          }
          if (validationErrors.hasOwnProperty("sim_mob_no2")) {
            console.log(validationErrors.mobile_no);
            document.getElementById("mob2_er_span").textContent =
              validationErrors.sim_mob_no2;
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
                      label="Sim IMEI No"
                      name="sim_imei_no"
                      id="sim_imei_no"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Sim IMEI No",
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
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Secondary Mobile No",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item name="valid_from" label="Valid From">
                      <DatePicker
                        style={{ width: "100%", fontSize: "16px" }}
                        required
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

                <span
                  id="imei_er_span"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                ></span>

                <span
                  id="mob1_er_span"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                ></span>

                <span
                  id="mob2_er_span"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                ></span>
              </Form>
            </div>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
}
