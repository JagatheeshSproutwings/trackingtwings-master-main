import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Select,
  Form,
  Button,
  Input,
  Space,
  notification,
  Spin,
} from "antd";
import api from "configs/apiConfig";
import { GREEN_BASE } from "constants/ThemeConstant";
const { TextArea } = Input;
const { Option } = Select;

const Create = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userLabel, SetUserLabel] = useState("Name");
  const [password, setPassword] = useState("");

  const [adminList, SetAdminList] = useState([]);
  const [distributorList, SetDistributorList] = useState([]);
  const [dealerList, SetDealerList] = useState([]);
  const [subdealerList, SetSubdealerList] = useState([]);
  const [customerList, SetCustomerList] = useState([]);

  const [selectedRoleId, setSelectedRoleId] = useState();
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState();
  const [countryOptions, setCountryOptions] = useState([]);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  function handlePassword(event) {
    let new_pass = event;
    setPassword(new_pass);

    // Regular expressions to validate password
    var lowerCase = /[a-z]/g;
    // var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    // var symbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g;

    if (!new_pass.match(lowerCase)) {
      openNotification("info", "Password", "Should contain lowercase letters!");
    }
    // else if (!new_pass.match(upperCase)) {
    //   openNotification("info", "Password", "Should contain uppercase letters!");
    // }
    else if (!new_pass.match(numbers)) {
      openNotification("info", "Password", "Should contain numbers!");
    }
    // else if (!new_pass.match(symbols)) {
    //   openNotification("info", "Password", "Should contain one symbol!");
    // }
    else if (new_pass.length < 8) {
      openNotification("info", "Password", "length should be minimum 8");
    } else {
      return "OK";
    }
  }

  const onFinish = async (values) => {
    setLoading(true);
    const res = handlePassword(values["password"]);
    if (res == "OK") {
      try {
        await api.post("user/store", values);
        form.resetFields();
        props.parentFunction();
        setLoading(false);

        openNotification("success", "User", "User Created Successfully!");
      } catch (error) {
        if (error.response && error.response.status === 403) {
          const errorData = error.response.data;
          if (errorData.message && typeof errorData.message === "object") {
            const validationErrors = errorData.message;
            if (validationErrors.hasOwnProperty("name")) {
              openNotification("info", "Name", "Given Name is Already Exists");
            }
            if (validationErrors.hasOwnProperty("email")) {
              openNotification(
                "info",
                "E-Mail ID",
                "Given E-Mail ID is Already Exists"
              );
            }
            if (validationErrors.hasOwnProperty("mobile_no")) {
              openNotification(
                "info",
                "Mobile No",
                "Given Mobile No is Already Exists"
              );
            }
          }
        }
      }
    } else {
      setLoading(false);
      openNotification(
        "error",
        "Password",
        "Password Should be as per the rules"
      );
    }
  };
  const handleRoleIdChange = (roleID) => {
    if (roleID == 2) {
      SetUserLabel("Admin Name");
    } else if (roleID == 3) {
      SetUserLabel("Distributor Name");
    } else if (roleID == 4) {
      SetUserLabel("Dealer Name");
    } else if (roleID == 5) {
      SetUserLabel("SubDealer Name");
    } else if (roleID == 6) {
      SetUserLabel("Customer Name");
    } else {
      SetUserLabel("Name");
    }
    setSelectedRoleId(roleID);
    SetroleType(roleID);
    getUserList();
  };
  const handleCountryIdChange = (countryId) => {
    setSelectedCountryId(countryId);
  };

  const [currentUser, SetCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );
  const user = () => {
    return localStorage.getItem("id");
  };
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );
  const role = () => {
    return localStorage.getItem("role");
  };

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

  useEffect(() => {
    SetCurrentUser(user());
    SetCurrentRole(role());
    fetchRoleOptions();
    fetchCountryOptions();
  }, []);

  const fetchRoleOptions = async () => {
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
  };

  const fetchCountryOptions = async () => {
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
  };

  return (
    <>
      <Spin spinning={loading} delay={500}>
        <Form
          form={form}
          size="small"
          name="registrationForm"
          onFinish={onFinish}
          encType="multipart/form-data"
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
                      <Select.Option role_id="2" value=""></Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            )}
            {(currentRole == 1 || currentRole == 2) && roleType >= "4" && (
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
            {(currentRole == 1 || currentRole == 2 || currentRole == 3) &&
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
                    <Select allowClear showSearch optionFilterProp="children">
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
                label={userLabel}
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
                      if (!value || getFieldValue("password") === value) {
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
          </Row>
          <Row gutter={[8, 8]}>
            <Col sm={12} md={12} lg={12}>
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
          </Row>
          <Row>
            <Col col-offset={18} sm={24} md={24} lg={24}>
              <Space wrap>
                <Button
                  type="primary"
                  style={{ backgroundColor: GREEN_BASE }}
                  success
                  shape="round"
                  htmlType="submit"
                >
                  Save
                </Button>
                <Button type="primary" shape="round">
                  Back
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export default Create;
