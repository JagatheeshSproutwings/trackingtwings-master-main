import React, { useState, useEffect } from "react";
import { Row, Col, Card, Select, Form, Button, Input, Space } from "antd";
import api from "configs/apiConfig";
import Flex from "components/shared-components/Flex";
import ButtonGroup from "antd/es/button/button-group";

const { TextArea } = Input;
const { Option } = Select;

const Report = () => {
  const [form] = Form.useForm();

  const [adminList, SetAdminList] = useState([]);
  const [distributorList, SetDistributorList] = useState([]);
  const [dealerList, SetDealerList] = useState([]);
  const [subdealerList, SetSubdealerList] = useState([]);
  const [customerList, SetCustomerList] = useState([]);

  const [selectedRoleId, setSelectedRoleId] = useState();
  const [roleOptions, setRoleOptions] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState();
  const [countryOptions, setCountryOptions] = useState([]);

  const onFinish = async (values) => {
    document.getElementById("name_er_span").textContent = "";
    document.getElementById("email_er_span").textContent = "";
    document.getElementById("mobile_er_span").textContent = "";

    try {
      await api.post("user/store", values);
      alert("Data Saved Successfully");
      form.resetFields();
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
  const handleRoleIdChange = (roleID) => {
    setSelectedRoleId(roleID);
    SetroleType(roleID);
  };
  const handleCountryIdChange = (countryId) => {
    setSelectedCountryId(countryId);
  };
  useEffect(() => {
    fetchRoleOptions(setRoleOptions);
    fetchCountryOptions(setCountryOptions);
  }, []);

  const [currentUser, SetCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );
  const [roleType, SetroleType] = useState("");

  const getUserList = async () => {
    const user_data = { user_id: currentUser };
    const vehicle_data = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });

    // Super Admin
    if (currentRole == 1) {
      console.log("Super Admin");
      SetAdminList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 2) {
      console.log("Admin");
      SetDistributorList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 3) {
      console.log("Distributor");
      SetDealerList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 4) {
      console.log("Dealer");
      SetCustomerList(vehicle_data?.data?.data?.user_list);
      SetSubdealerList(vehicle_data?.data?.data?.subdealer_list);
    }
    if (currentRole == 5) {
      console.log("Subdealer");
      SetCustomerList(vehicle_data?.data?.data?.user_list);
    }
  };
  const user = () => {
    return localStorage.getItem("id");
  };
  const role = () => {
    return localStorage.getItem("role");
  };

  // on change Admin
  const AdminChange = async (value) => {
    form.setFieldValue("");
    SetDistributorList([]);
    SetDealerList([]);
    SetSubdealerList([]);
    SetCustomerList([]);
    const user_get_data = { user_id: value };
    const distributor_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetDistributorList(distributor_list?.data?.data?.user_list);
  };
  // On change Distributor
  const DistributorChange = async (value) => {
    form.setFieldValue("");
    SetDealerList("");
    SetSubdealerList("");
    SetCustomerList([]);
    const user_get_data = { user_id: value };
    const dealer_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetDealerList(dealer_list?.data?.data?.user_list);
  };
  // on change Dealer
  const DealerChange = async (value) => {
    form.setFieldValue("");
    SetSubdealerList([]);
    SetCustomerList([]);
    const user_get_data = { user_id: value };
    const subdealer_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetCustomerList(subdealer_list?.data?.data?.user_list);
    SetSubdealerList(subdealer_list?.data?.data?.subdealer_list);
  };
  // on change SubDealer
  const SubDealerChange = async (value) => {
    form.setFieldValue("");
    SetCustomerList([]);
    const user_get_data = { user_id: value };
    const customer_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    SetCustomerList(customer_list?.data?.data?.user_list);
  };
  const CustomerChange = async (value) => {};

  useEffect(() => {
    SetCurrentUser(user());
    SetCurrentRole(role());
    getUserList();
  }, []);

  async function fetchRoleOptions(setRoleOptions) {
    try {
      const response = await api.get(`role_rights_list/${currentRole}`);
      if (response.data.success) {
        setRoleOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

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
    <>
      <Row gutter={6}>
        <Col>
          <Card>
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
                        label="Role"
                        name="role_id"
                        rules={[
                          {
                            required: true,
                            message: "Please Select a Role",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Role"
                          optionFilterProp="children"
                          onChange={handleRoleIdChange}
                          value={selectedRoleId}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {Array.isArray(roleOptions) ? (
                            roleOptions.map((role) => (
                              <Option key={role.id} value={role.id}>
                                {role.name}
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
                      {currentRole == 1 && roleType >= "3" && (
                        <Form.Item
                          label="Admin"
                          name="admin_id"
                          rules={[
                            {
                              required: true,
                              message: "Please Select a Role",
                            },
                          ]}
                        >
                          <Select onChange={AdminChange} allowClear>
                            {Array.isArray(adminList) ? (
                              adminList.map((admin) => (
                                <Select.Option
                                  key={admin?.id}
                                  role_id="2"
                                  value={admin?.id}
                                >
                                  {admin?.name}
                                </Select.Option>
                              ))
                            ) : (
                              <Select.Option
                                role_id="2"
                                value=""
                              ></Select.Option>
                            )}
                          </Select>
                        </Form.Item>
                      )}
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      {(currentRole == 1 || currentRole == 2) &&
                        roleType >= "4" && (
                          <Form.Item
                            label="Distributor"
                            name="distributor_id"
                            rules={[
                              {
                                required: true,
                                message: "Please Select a Role",
                              },
                            ]}
                          >
                            <Select onChange={DistributorChange} allowClear>
                              {Array.isArray(distributorList) ? (
                                distributorList.map((distributor) => (
                                  <Option
                                    key={distributor?.id}
                                    role_id="3"
                                    value={distributor?.id}
                                  >
                                    {distributor?.name}
                                  </Option>
                                ))
                              ) : (
                                <Option role_id="3" value=""></Option>
                              )}
                            </Select>
                          </Form.Item>
                        )}
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      {(currentRole == 1 ||
                        currentRole == 2 ||
                        currentRole == 3) &&
                        roleType >= "5" && (
                          <Form.Item
                            label="Dealer"
                            name="dealer_id"
                            rules={[
                              {
                                required: true,
                                message: "Please Select a Role",
                              },
                            ]}
                          >
                            <Select onChange={DealerChange} allowClear>
                              {Array.isArray(dealerList) ? (
                                dealerList.map((dealer) => (
                                  <Option
                                    key={dealer?.id}
                                    role_id="4"
                                    value={dealer?.id}
                                  >
                                    {dealer?.name}
                                  </Option>
                                ))
                              ) : (
                                <Option role_id="4" value=""></Option>
                              )}
                            </Select>
                          </Form.Item>
                        )}
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      {(currentRole == 1 ||
                        currentRole == 2 ||
                        currentRole == 3 ||
                        currentRole == 4) &&
                        roleType >= "6" && (
                          <Form.Item label="Subdealer" name="subdealer_id">
                            <Select onChange={SubDealerChange} allowClear>
                              {Array.isArray(subdealerList) &&
                              subdealerList.length > 0 ? (
                                subdealerList.map((subdealer) => (
                                  <Option
                                    key={subdealer?.id}
                                    role_id="6"
                                    value={subdealer?.id}
                                  >
                                    {subdealer?.name}
                                  </Option>
                                ))
                              ) : (
                                <Option></Option>
                              )}
                            </Select>
                          </Form.Item>
                        )}
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      {(currentRole == 1 ||
                        currentRole == 2 ||
                        currentRole == 3 ||
                        currentRole == 4 ||
                        currentRole == 5) &&
                        roleType >= "7" && (
                          <Form.Item
                            label="Customer"
                            name="customer_id"
                            rules={[
                              {
                                required: true,
                                message: "Please Select a Role",
                              },
                            ]}
                          >
                            <Select onChange={CustomerChange} allowClear>
                              {Array.isArray(customerList) ? (
                                customerList.map((customer) => (
                                  <Option
                                    key={customer?.id}
                                    role_id="6"
                                    value={customer?.id}
                                  >
                                    {customer?.name}
                                  </Option>
                                ))
                              ) : (
                                <Option></Option>
                              )}
                            </Select>
                          </Form.Item>
                        )}
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="User Name"
                        name="name"
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
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a password",
                          },
                          {
                            min: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="Confirm Password"
                        name="c_password"
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      {" "}
                      <Form.Item
                        size="small"
                        label="Mobile No"
                        name="mobile_no"
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
                        rules={[
                          {
                            required: true,
                            message: "Please Select a Country",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Country"
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
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Address",
                          },
                        ]}
                      >
                        <TextArea
                          rows={4}
                          placeholder="Please Enter Adress"
                          maxLength={100}
                        />
                      </Form.Item>
                    </Col>
                    <ButtonGroup>
                      <Button type="primary" shape="round" htmlType="submit">
                        Save
                      </Button>
                      <Button type="primary" shape="round">
                        Back
                      </Button>
                    </ButtonGroup>
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
                  </Row>
                </Form>
              </div>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Report;
