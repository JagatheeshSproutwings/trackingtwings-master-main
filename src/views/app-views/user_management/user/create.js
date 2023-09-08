import React, { useState, useEffect } from "react";
import { Row, Col, Card, Select, Form, Button, Input } from "antd";
import api from "configs/apiConfig";
import Flex from "components/shared-components/Flex";
import ButtonGroup from "antd/es/button/button-group";

const { TextArea } = Input;
const { Option } = Select;

const Report = () => {
  const [form] = Form.useForm();

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handlePassword(event) {
    let new_pass = event.target.value;
    setPassword(new_pass);

    // Regular expressions to validate password
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var symbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g;

    if (!new_pass.match(lowerCase)) {
      setErrorMessage("Should contain lowercase letters!");
    } else if (!new_pass.match(upperCase)) {
      setErrorMessage("Should contain uppercase letters!");
    } else if (!new_pass.match(numbers)) {
      setErrorMessage("Should contain numbers!");
    } else if (!new_pass.match(symbols)) {
      setErrorMessage("Should contain at least one symbol!");
    } else if (new_pass.length < 10) {
      setErrorMessage("length should be more than 10.");
    } else {
      setErrorMessage("Password is strong!");
    }
  }

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
      form.resetFields();
      alert("Data Saved Successfully");
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
      const data = { role_id: currentRole };
      const response = await api.post("role_rights_list", data);
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
          <Card title="New User">
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
                          allowClear
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
                    {currentRole == 1 && roleType >= "3" && (
                      <Col sm={12} md={12} lg={12}>
                        <Form.Item
                          label="Admin"
                          name="admin_id"
                          rules={[
                            {
                              required: true,
                              message: "Please Select a Admin",
                            },
                          ]}
                        >
                          <Select
                            onChange={AdminChange}
                            allowClear
                            showSearch
                            optionFilterProp="children"
                          >
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
                      </Col>
                    )}
                    {(currentRole == 1 || currentRole == 2) &&
                      roleType >= "4" && (
                        <Col sm={12} md={12} lg={12}>
                          <Form.Item
                            label="Distributor"
                            name="distributor_id"
                            rules={[
                              {
                                required: true,
                                message: "Please Select Distributor",
                              },
                            ]}
                          >
                            <Select
                              onChange={DistributorChange}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                            >
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
                        </Col>
                      )}
                    {(currentRole == 1 ||
                      currentRole == 2 ||
                      currentRole == 3) &&
                      roleType >= "5" && (
                        <Col sm={12} md={12} lg={12}>
                          <Form.Item
                            label="Dealer"
                            name="dealer_id"
                            rules={[
                              {
                                required: true,
                                message: "Please Select Dealer",
                              },
                            ]}
                          >
                            <Select
                              onChange={DealerChange}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                            >
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
                        </Col>
                      )}
                    {(currentRole == 1 ||
                      currentRole == 2 ||
                      currentRole == 3 ||
                      currentRole == 4) &&
                      roleType >= "6" && (
                        <Col sm={12} md={12} lg={12}>
                          <Form.Item label="Subdealer" name="subdealer_id">
                            <Select
                              onChange={SubDealerChange}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                            >
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
                        </Col>
                      )}
                    {(currentRole == 1 ||
                      currentRole == 2 ||
                      currentRole == 3 ||
                      currentRole == 4 ||
                      currentRole == 5) &&
                      roleType >= "7" && (
                        <Col sm={12} md={12} lg={12}>
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
                            <Select
                              onChange={CustomerChange}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                            >
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
                        </Col>
                      )}
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
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
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        value={password}
                        onChange={handlePassword}
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a password",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
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
                    {/* <div style={{ color: "red" }}>{errorMessage}</div> */}
                    <span
                      style={{
                        fontSize: "11px",
                        color: "green",
                        fontWeight: "bold",
                        fontFamily: "Segoe UI",
                        fontStyle: "italic",
                        marginTop: "-15px",
                      }}
                    >
                      *[One UpperCase & LowerCase, One Number, One Symbol, Min.
                      8 Characters Length]
                    </span>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col sm={12} md={12} lg={12}>
                      {" "}
                      <Form.Item
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
                        label="Country"
                        name="country_id"
                        rules={[
                          {
                            required: true,
                            message: "Please select a country",
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
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col sm={24} md={24} lg={24}>
                      <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <TextArea rows={4} maxLength={100} />
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
