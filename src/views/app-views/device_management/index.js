import React, { useState, useEffect } from "react";
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
  notification,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "configs/apiConfig";
import { Space, Menu, Dropdown, message } from "antd";
import Flex from "components/shared-components/Flex";

import {
  DownOutlined,
  EditOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Config from "./config";
import utils from "utils";

const { Option } = Select;

const Vehicle = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const [editdata, setEditData] = useState("");

  const dateFormat = "YYYY-MM-DD";
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [adminList, SetAdminList] = useState([]);
  const [distributorList, SetDistributorList] = useState([]);
  const [dealerList, SetDealerList] = useState([]);
  const [subdealerList, SetSubdealerList] = useState([]);
  const [customerList, SetCustomerList] = useState([]);

  const [planList, SetPlanList] = useState([]);

  //For Dealer and SubDealer Direct
  const [userValue, setUserValue] = useState(localStorage.getItem("id") || "");

  const [licenseList, SetLicenseList] = useState([]);

  const [vehicleTypeList, SetVehicleTypeList] = useState([]);

  const [simList, SetSimList] = useState([]);
  const [simData, SetSimData] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [mainvehicleList, setMainVehicleList] = useState([]);

  const [deviceList, SetDeviceList] = useState([]);
  const [deviceData, SetDeviceData] = useState("");
  const [makeIdData, SetMakeIdData] = useState("");
  const [modelIdData, SetModelIdData] = useState("");
  const [makeData, SetMakeData] = useState("");
  const [modelData, SetModelData] = useState("");

  const [currentUser, SetCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );

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
      SetAdminList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 2) {
      SetDistributorList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 3) {
      SetDealerList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 4) {
      SetCustomerList(vehicle_data?.data?.data?.user_list);
      SetSubdealerList(vehicle_data?.data?.data?.subdealer_list);
    }
    if (currentRole == 5) {
      SetCustomerList(vehicle_data?.data?.data?.user_list);
    }
  };
  const user = () => {
    return localStorage.getItem("id");
  };
  const role = () => {
    return localStorage.getItem("role");
  };

  useEffect(() => {
    SetCurrentUser(user());
    SetCurrentRole(role());
    getUserList();
    loadVehicles();
    loadPlans();
    loadsims();
    loaddevices();
  }, []);

  // on change Admin
  const AdminChange = async (value) => {
    form.setFieldValue("");
    SetDistributorList([]);
    SetDealerList([]);
    SetSubdealerList([]);
    SetCustomerList([]);
    if (value != null) {
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
    }
  };
  // On change Distributor
  const DistributorChange = async (value) => {
    form.setFieldValue("");
    SetDealerList("");
    SetSubdealerList("");
    SetCustomerList("");
    if (value != null) {
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
    }
  };
  // on change Dealer
  const DealerChange = async (value) => {
    form.setFieldValue("");
    SetSubdealerList([]);
    SetCustomerList([]);
    SetPlanList([]);
    SetSimList([]);
    SetDeviceList([]);

    if (value != null) {
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

      setUserValue(value);
      const plan_list = await api
        .post("user_plan_list", user_get_data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetPlanList(plan_list?.data.data);

      const sim_list = await api
        .post("sim_stock_list", user_get_data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetSimList(sim_list?.data.data);

      const device_list = await api
        .post("device_stock_list", user_get_data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetDeviceList(device_list?.data.data);
    }
  };
  // on change SubDealer
  const SubDealerChange = async (value) => {
    form.setFieldValue("");

    SetCustomerList("");
    SetPlanList("");
    SetLicenseList("");
    SetSimList("");
    SetDeviceList("");
    SetDeviceData("");
    SetMakeData("");
    SetModelData("");
    SetSimData("");

    if (value != null) {
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
      setUserValue(value);
      const plan_list = await api
        .post("user_plan_list", user_get_data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetPlanList(plan_list?.data.data);
      const sim_list = await api
        .post("sim_stock_list", user_get_data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetSimList(sim_list?.data.data);
      const device_list = await api
        .post("device_stock_list", user_get_data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetDeviceList(device_list?.data.data);
    } else {
      alert(currentRole);
      alert(currentUser);
      if (currentRole == 4) {
        const user_get_data = { user_id: currentUser };
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
        setUserValue(currentUser);
        const plan_list = await api
          .post("user_plan_list", user_get_data)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });
        SetPlanList(plan_list?.data.data);

        const sim_list = await api
          .post("sim_stock_list", user_get_data)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });
        SetSimList(sim_list?.data.data);

        const device_list = await api
          .post("device_stock_list", user_get_data)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });
        SetDeviceList(device_list?.data.data);
      }
    }
  };

  const CustomerChange = async () => {
    SetVehicleTypeList([]);
    const vehicle_type_list = await api
      .get("vehicle_type")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetVehicleTypeList(vehicle_type_list?.data?.data);
  };

  const PlanChange = async (value) => {
    SetLicenseList([]);

    if (value != null) {
      const data = { user_id: userValue, plan_id: value };
      const license_list = await api
        .post("user_license_list", data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      SetLicenseList(license_list?.data.data);
    } else {
      alert("s");
    }
  };

  const DeviceChange = async (value) => {
    SetDeviceData("");
    SetMakeIdData("");
    SetModelIdData("");
    SetMakeData("");
    SetModelData("");

    try {
      const device_data = await api.get(`device/${value}`);
      const deviceUid = device_data?.data?.data?.uid;
      const device_make_id = device_data?.data?.data?.device_make_id;
      const device_model_id = device_data?.data?.data?.device_model_id;
      const device_make = device_data?.data?.data?.device_make;
      const device_model = device_data?.data?.data?.device_model;

      if (deviceUid) {
        SetDeviceData(deviceUid);
        SetMakeIdData(device_make_id);
        SetModelIdData(device_model_id);
        SetMakeData(device_make);
        SetModelData(device_model);
      } else {
      }
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  const SimChange = async (value) => {
    SetSimData("");
    try {
      const sim_data = await api.get(`sim/${value}`);
      const sim_imei_no = sim_data?.data?.data?.sim_imei_no;
      if (sim_imei_no) {
        SetSimData(sim_imei_no);
      } else {
      }
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values["user_id"] = currentUser;
      const installation_date = new Date(values["installation_date"]);
      values["installation_date"] = installation_date
        .toISOString()
        .split("T")[0];
      await api.post("vehicle", values);
      form.resetFields();
      setLoading(false);

      openNotification("success", "Vehicle", "Vehicle Added Successfully!");
      loadVehicles();
      SetSimData("");
      SetDeviceData("");
      SetMakeData("");
      SetModelData("");
      onClose();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
      }
    }
  };

  const tableColumns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Type",
      dataIndex: "vehicle_type",
    },
    {
      title: "Vehicle No",
      dataIndex: "vehicle_name",
    },
    {
      title: "Sim No",
      dataIndex: "sim_mob_no",
    },
    {
      title: "Device IMEI",
      dataIndex: "device_imei",
    },
    {
      title: "License No",
      dataIndex: "license_no",
    },
    {
      title: "Installation Date",
      dataIndex: "installation_date",
    },
    {
      title: "Expire Date",
      dataIndex: "expire_date",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",

      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={getMenu(record)} placement="bottomLeft">
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const getMenu = (record) => (
    <Menu>
      {/* <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
      >
        Edit
      </Menu.Item> */}
      <Menu.Item
        key="config"
        icon={<SettingOutlined />}
        onClick={() => handleSetting(record)}
      >
        Settings
      </Menu.Item>
    </Menu>
  );

  const handleEdit = (record) => {
    message.success(`Editing ${record.vehicle_name}`);
  };

  const handleSetting = async (record) => {
    try {
      const data = {
        vehicle_id: record.id,
        device_imei: record.device_imei,
      };
      const response = await api.post("config/show", data);
      console.log("API Response:", response);

      if (response.status === 200) {
        const responseData = response.data; // Assuming the data is directly under response.data
        if (responseData.success) {
          const configurationData = responseData.data; // Access the data property
          setEditData(configurationData); // Set the data in setEditData
          setIsComponentVisible(true);
        } else {
          alert(
            "API request was successful, but the response indicates an error."
          );
        }
      } else {
        alert("API request failed with status code: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadVehicles = async () => {
    try {
      const user_data = { user_id: currentUser };
      const response = await api.post("vehicle_list", user_data);

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
          id: item.id,
          vehicle_type: item.vehicle_type,
          vehicle_name: item.vehicle_name,
          sim_mob_no: item.sim_mob_no,
          device_imei: item.device_imei,
          license_no: item.license_no,
          installation_date: item.installation_date,
          expire_date: item.expire_date,
          client_name: item.client_name,
        }));
        setVehicleList(processedData);
        setMainVehicleList(processedData);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadsims = async () => {
    try {
      SetSimList([]);

      const user_data = { user_id: currentUser };
      const sim_list = await api.post("sim_stock_list", user_data);

      if (sim_list.data && Array.isArray(sim_list.data.data)) {
        SetSimList(sim_list?.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const loaddevices = async () => {
    try {
      SetDeviceList([]);

      const user_data = { user_id: currentUser };
      const device_list = await api.post("device_stock_list", user_data);

      if (device_list.data && Array.isArray(device_list.data.data)) {
        SetDeviceList(device_list?.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const loadPlans = async () => {
    SetPlanList([]);

    const data = { user_id: currentUser };

    const plan_list = await api
      .post("user_plan_list", data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetPlanList(plan_list?.data?.data);
  };

  const onSearch = (e) => {
    const searchValue = e.currentTarget.value;
    const searchArray = searchValue ? vehicleList : mainvehicleList; // Use a different source if needed
    const filteredUserList = utils.wildCardSearch(searchArray, searchValue);
    setVehicleList(filteredUserList);
    setSelectedRowKeys([]);
  };

  const parentFunction = () => {
    setIsComponentVisible(false);
  };

  return (
    <div>
      {isComponentVisible && (
        <Config parentToChild={editdata} parentFunction={parentFunction} />
      )}
      <Card title="Vehicle List">
        <Row>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
              />
            </div>

            <div className="mb-3"></div>
          </Flex>
          <Col span={4}>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
              Add Vehicle
            </Button>
          </Col>
        </Row>
        <Row>
          <div className="table-responsive">
            <Table
              bordered
              columns={tableColumns}
              dataSource={vehicleList}
              rowKey="id"
            />
          </div>
        </Row>
      </Card>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        width={850}
        open={open}
        title="Add Vehicle"
      >
        <Spin spinning={loading} delay={500}>
          <Form form={form} name="device_form" onFinish={onFinish}>
            <h5>Users Details:</h5>
            <Row gutter={[10, 10]}>
              {currentRole == 1 && (
                <Col sm={2} md={4} lg={4} xxl={4}>
                  <Form.Item name="admin_id">
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      onChange={AdminChange}
                      placeholder="Select Admin"
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
              {(currentRole == 1 || currentRole == 2) && (
                <Col sm={2} md={4} lg={4} xxl={4}>
                  <Form.Item name="distributor_id">
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      onChange={DistributorChange}
                      placeholder="Select Distributor"
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
              {(currentRole == 1 || currentRole == 2 || currentRole == 3) && (
                <Col sm={2} md={4} lg={4} xxl={4}>
                  <Form.Item name="dealer_id">
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      onChange={DealerChange}
                      placeholder="Select Dealer"
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
                currentRole == 4) && (
                <Col sm={2} md={4} lg={4} xxl={4}>
                  <Form.Item name="subdealer_id">
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      onChange={SubDealerChange}
                      placeholder="Select SubDealer"
                    >
                      {Array.isArray(subdealerList) &&
                      subdealerList.length > 0 ? (
                        subdealerList.map((subdealer) => (
                          <Option
                            key={subdealer?.id}
                            role_id="5"
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
                currentRole == 5) && (
                <Col sm={2} md={4} lg={4} xxl={4}>
                  <Form.Item
                    name="client_id"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Client Name",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      onChange={CustomerChange}
                      placeholder="Select Client"
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
                        <Option role_id="6" value=""></Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
            <h5>Licence Details:</h5>
            <Row gutter={6}>
              <Col sm={5} md={10} lg={10} xxl={10}>
                <Form.Item
                  name="plan_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Plan",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Plan"
                    onChange={PlanChange}
                  >
                    {Array.isArray(planList) ? (
                      planList.map((plan) => (
                        <Select.Option key={plan?.id} value={plan?.id}>
                          {plan?.package_name}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option value=""></Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={5} md={10} lg={10} xxl={10}>
                <Form.Item
                  name="license_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select License",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select License"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Array.isArray(licenseList) ? (
                      licenseList.map((license) => (
                        <Select.Option key={license?.id} value={license?.id}>
                          {license?.license_no}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option role_id="2" value=""></Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <h5>Device Details :</h5>
            <Row gutter={6}>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  name="device_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Device IMEI",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    onChange={DeviceChange}
                    placeholder="Select Device IMEI"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Array.isArray(deviceList) ? (
                      deviceList.map((device) => (
                        <Select.Option key={device?.id} value={device?.id}>
                          {device?.device_imei_no}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option role_id="2" value=""></Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item>
                  <Input type="text" value={deviceData}></Input>
                </Form.Item>
              </Col>
              <Col sm={4} md={8} lg={8} xxl={8}>
                <input
                  type="text"
                  name="device_make_id"
                  hidden
                  value={makeIdData}
                ></input>
                <input
                  type="text"
                  name="device_model_id"
                  hidden
                  value={modelIdData}
                ></input>
                <Form.Item>
                  <Input
                    type="textarea"
                    value={makeData + "-" + modelData}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <h5>SIM Details :</h5>
            <Row gutter={6}>
              <Col sm={5} md={10} lg={10} xxl={10}>
                <Form.Item
                  name="sim_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Sim Mobile No",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Sim"
                    optionFilterProp="children"
                    onChange={SimChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Array.isArray(simList) ? (
                      simList.map((sim) => (
                        <Select.Option key={sim?.id} value={sim?.id}>
                          {sim?.sim_mob_no1}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option role_id="2" value=""></Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Form.Item>
                <Input type="text" value={simData}></Input>
              </Form.Item>
            </Row>
            <h5>Vehicle Details :</h5>
            <Row gutter={6}>
              <Col sm={5} md={10} lg={10} xxl={10}>
                <Form.Item
                  name="vehicle_type_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Vehicle Type",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Vehicle Type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Array.isArray(vehicleTypeList) ? (
                      vehicleTypeList.map((vehicletype) => (
                        <Select.Option
                          key={vehicletype?.id}
                          value={vehicletype?.id}
                        >
                          {vehicletype?.vehicle_type}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option></Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={4} md={8} lg={8} xxl={8}>
                <Form.Item
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
                </Form.Item>
              </Col>
              <Col sm={4} md={8} lg={8} xxl={8}>
                <Form.Item name="installation_date">
                  <DatePicker
                    required
                    allowClear={false}
                    format={dateFormat}
                    placeholder="Installation Date"
                  ></DatePicker>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
};

export default Vehicle;
