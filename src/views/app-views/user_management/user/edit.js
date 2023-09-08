import React, { useState, useEffect } from "react";
import { Button, Card, Select, Input, Form, Row, Col, Space } from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";

const { TextArea } = Input;
const { Option } = Select;

export default function Edit({ parentToChild }) {
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const [selectedCountryId, setSelectedCountryId] = useState();
  const [countryOptions, setCountryOptions] = useState([]);

  const handleCountryIdChange = (countryId) => {
    setSelectedCountryId(countryId);
  };
  useEffect(() => {
    fetchCountryOptions(setCountryOptions);
  }, []);

  const onFinish = async (values) => {
    document.getElementById("name_er_span").textContent = "";
    document.getElementById("email_er_span").textContent = "";
    document.getElementById("mobile_er_span").textContent = "";

    try {
      await api.post("user/update", values);
      // window.location.reload(true);
      // setIsSubmitted(true);
      toggleComponentVisibility();
      alert("User Updated Successfully");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("name")) {
            console.log(validationErrors.name);
            document.getElementById("name_er_span").textContent =
              validationErrors.name;
          }
          if (validationErrors.hasOwnProperty("email")) {
            console.log(validationErrors.email);
            document.getElementById("email_er_span").textContent =
              validationErrors.email;
          }
          if (validationErrors.hasOwnProperty("mobile_no")) {
            console.log(validationErrors.mobile_no);
            document.getElementById("mobile_er_span").textContent =
              validationErrors.mobile_no;
          }
        }
      }
    }
  };

  async function fetchCountryOptions(setCountryOptions) {
    try {
      const response = await api.get("country");
      if (response.data.success) {
        setCountryOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  return (
    <Row gutter={6}>
      {isComponentVisible && (
        <Col>
          <Card title="Edit User">
            <Flex>
              <div className="container">
                <Form
                  size="small"
                  name="registrationForm"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Row gutter={[8, 8]}>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="User Name"
                        name="name"
                        initialValue={parentToChild[1]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your name",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="E-Mail ID"
                        name="email"
                        initialValue={parentToChild[2]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="Mobile No"
                        name="mobile_no"
                        initialValue={parentToChild[3]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your mobile no",
                          },
                          {
                            type: "text",
                            message: "Please enter a valid mobile no",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="Country"
                        name="country_id"
                        initialValue={parentToChild[7]}
                        rules={[
                          {
                            required: true,
                            message: "Please Select a Country",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          onChange={handleCountryIdChange}
                          value={selectedCountryId}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {Array.isArray(countryOptions) ? (
                            countryOptions.map((country) => (
                              <Option key={country.id} value={country.id}>
                                {country.country_name}
                              </Option>
                            ))
                          ) : (
                            <Option value="Loading">Loading...</Option>
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                      <Form.Item
                        size="small"
                        label="Address"
                        name="address"
                        initialValue={parentToChild[9]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Address",
                          },
                        ]}
                      >
                        <TextArea rows={4} maxLength={100} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align={"middle"}>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        hidden
                        name="id"
                        initialValue={parentToChild[0]}
                      >
                        <Input></Input>
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        hidden
                        name="role_id"
                        initialValue={parentToChild[5]}
                      >
                        <Input></Input>
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
                            Register
                          </Button>
                          <Button type="primary" shape="round">
                            Back
                          </Button>
                        </Space>
                      </Form.Item>
                    </Col>
                  </Row>

                  <span
                    id="name_er_span"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  ></span>

                  <span
                    id="email_er_span"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  ></span>

                  <span
                    id="mobile_er_span"
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
      )}
    </Row>
  );
}
