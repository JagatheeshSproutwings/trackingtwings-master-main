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
import moment from "moment";

const { Option } = Select;

const Edit = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const [selectedNetworkId, setselectedNetworkId] = useState();
  const [networkOptions, setNetworkOptions] = useState([]);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const handleNetworkIdChange = (roleID) => {
    setselectedNetworkId(roleID);
  };

  useEffect(() => {
    fetchRoleOptions(setNetworkOptions);
  }, []);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const onFinish = async (values) => {
    const validFrom = moment(values.valid_from).format("YYYY-MM-DD");
    const validTo = moment(values.valid_to).format("YYYY-MM-DD");

    const data = {
      id: parentToChild[0],
      network_id: values.network_id,
      sim_imei_no: values.sim_imei_no,
      sim_mob_no1: values.sim_mob_no1,
      sim_mob_no2: values.sim_mob_no2,
      valid_from: validFrom,
      valid_to: validTo,
    };

    try {
      await api.post("sim/update", data);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "Sim", "Sim Updated Successfully!");
      toggleComponentVisibility();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("sim_imei_no")) {
            openNotification(
              "info",
              "Sim CCID",
              "Given Sim CCID is Already Exists"
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
  async function fetchRoleOptions(setNetworkOptions) {
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
      {isComponentVisible && (
        <Col>
          <Card title="Edit Sim">
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
                        initialValue={parentToChild[1]}
                        rules={[
                          {
                            required: true,
                            message: "Please Select a Network",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Network"
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
                        initialValue={parentToChild[3]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Sim CCID",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        initialValue={parentToChild[4]}
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
                        initialValue={parentToChild[5]}
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
                      <Form.Item
                        name="valid_from"
                        label="Valid From"
                        initialValue={moment(parentToChild[6])}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a valid from",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%", fontSize: "16px" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        name="valid_to"
                        label="Valid To"
                        initialValue={moment(parentToChild[6])}
                        rules={[
                          {
                            required: true,
                            message: "Please select a valid to",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%", fontSize: "16px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row align={"middle"}>
                    <Col span={12}>
                      <Form.Item>
                        <Space wrap>
                          <Button
                            type="primary"
                            shape="round"
                            htmlType="submit"
                          >
                            Update
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
      )}
    </Row>
  );
};

export default Edit;
