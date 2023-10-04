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
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "configs/apiConfig";
import { Space, Menu, Dropdown } from "antd";
import Flex from "components/shared-components/Flex";
import {
  DownOutlined,
  SettingTwoTone,
  SearchOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import Config from "./config";
import Configs from "./configs";
import utils from "utils";

import AdminUpdate from "./admin_update";
import CustomerUpdate from "./customer_update";

const { Option } = Select;

const Vehicle = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const [isAdminUpdateVisible, setIsAdminUpdateVisible] = useState(false);
  const [isCustomerUpdateVisible, setIsCustomerUpdateVisible] = useState(false);

  const [isConfigVisible, setIsConfigVisible] = useState(false);

  const [mulitiVehicles, setMulitiVehicles] = useState([]);

  const [editdata, setEditData] = useState("");
  const [updatedata, setUpdateData] = useState("");

  const [deleteID, setDeleteID] = useState("");

  const dateFormat = "YYYY-MM-DD";
  const [open, setOpen] = useState(false);
  const [deleteopen, setDeleteOpen] = useState(false);

  const [adminList, SetAdminList] = useState([]);
  const [distributorList, SetDistributorList] = useState([]);
  const [dealerList, SetDealerList] = useState([]);
  const [subdealerList, SetSubdealerList] = useState([]);
  const [customerList, SetCustomerList] = useState([]);

  const [planList, SetPlanList] = useState([]);
  const [licenseList, SetLicenseList] = useState([]);
  const [vehicleTypeList, SetVehicleTypeList] = useState([]);

  const [simList, SetSimList] = useState([]);
  const [deviceList, SetDeviceList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [mainvehicleList, setMainVehicleList] = useState([]);

  const [simData, SetSimData] = useState("");

  const [deviceData, SetDeviceData] = useState("");
  const [makeIdData, SetMakeIdData] = useState("");
  const [modelIdData, SetModelIdData] = useState("");
  const [makeData, SetMakeData] = useState("");
  const [modelData, SetModelData] = useState("");

  const [installationDate, SetInstallationDate] = useState("");
  const [expireDate, SetExpireDate] = useState("");
  const [extendDate, SetExtendDate] = useState("");
  // Function to format the date as a string in the desired format

  const [currentUser, SetCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );

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

  const [userValue, setUserValue] = useState(localStorage.getItem("id") || "");

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
    SetInstallationDate("");
    SetExpireDate("");
    SetExtendDate("");

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

      SetInstallationDate("");
      SetExpireDate("");
      SetExtendDate("");

      const plan_days = await api
        .post("plan_days", data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      console.log(plan_days);
      console.log(plan_days?.data);
      console.log(plan_days?.data?.data);
      SetInstallationDate(plan_days?.data?.data?.installation_date);
      SetExpireDate(plan_days?.data?.data?.expire_date);
      SetExtendDate(plan_days?.data?.data?.extend_date);
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
      const device_make_id = device_data?.data?.data?.device_make_id;
      const device_model_id = device_data?.data?.data?.device_model_id;
      const device_make = device_data?.data?.data?.device_make;
      const device_model = device_data?.data?.data?.device_model;
      const deviceUid = device_data?.data?.data?.uid;

      SetDeviceData(deviceUid);
      SetMakeIdData(device_make_id);
      SetModelIdData(device_model_id);
      SetMakeData(device_make);
      SetModelData(device_model);
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
      values["installation_date"] = installationDate;
      values["expire_date"] = expireDate;
      values["extend_date"] = extendDate;

      const vehicle_expire_date = new Date(values["vehicle_expire_date"]);
      values["vehicle_expire_date"] = vehicle_expire_date
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

      SetInstallationDate("");
      SetExpireDate("");
      SetExtendDate("");

      loadsims();
      loaddevices();
      onClose();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
      }
    }
  };

  let serialNumber = 0;
  const tableColumns = [
    {
      title: "S No",
      render: () => {
        serialNumber++; // Increment the counter for each row
        return <span>{serialNumber}</span>;
      },
      fixed: "left", // If you want it to be a fixed column on the left
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

  const showPopconfirm = (record) => {
    setDeleteID(record.id);
    setDeleteOpen(true);
  };

  const handleCancel = () => {
    setDeleteOpen(false);
  };

  const handleOk = async () => {
    const data = { id: deleteID };
    try {
      const response = await api.post("customer_vehicle_delete", data);
      openNotification("success", "Vehicle", "Vehicle Deleted Successfully!");
      setDeleteOpen(false);
      loadVehicles();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const getMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditTwoTone />}
        onClick={() => handleEdit(record)}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteTwoTone />}
        onClick={() => showPopconfirm(record)}
      >
        Delete
      </Menu.Item>
      <Menu.Item
        key="config"
        icon={<SettingTwoTone />}
        onClick={() => handleSetting(record)}
      >
        Settings
      </Menu.Item>
    </Menu>
  );
  const handleSetting = async (record) => {
    try {
      const data = {
        vehicle_id: record.id,
        device_imei: record.device_imei,
      };
      const response = await api.post("config/show", data);
      if (response.status === 200) {
        const responseData = response.data;
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
  const handleEdit = async (record) => {
    if (currentRole == 6) {
      console.log(record);
      setUpdateData(record);
      setIsAdminUpdateVisible(false);
      setIsCustomerUpdateVisible(true);
    } else {
      console.log(record);
      setUpdateData(record);
      setIsAdminUpdateVisible(true);
      setIsCustomerUpdateVisible(false);
    }
  };
  const clickConfig = async () => {
    if (mulitiVehicles.length !== 0) {
      setIsConfigVisible(true);
    } else {
      openNotification("info", "Vehicle", "Please Select Atleast One Vehicles");
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
          vehicle_type_id: item.vehicle_type_id,
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
    try {
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
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const onSearch = (e) => {
    const searchValue = e.currentTarget.value;
    const searchArray = searchValue ? vehicleList : mainvehicleList; // Use a different source if needed
    const filteredUserList = utils.wildCardSearch(searchArray, searchValue);
    setVehicleList(filteredUserList);
  };
  const parentFunction = () => {
    setIsComponentVisible(false);
    setIsConfigVisible(false);
    setIsAdminUpdateVisible(false);
    setIsCustomerUpdateVisible(false);
    loadVehicles();
  };
  const changeMutliVehicles = async (value) => {
    setMulitiVehicles(value);
  };

  return (
    <>
      <div>
        {isComponentVisible && (
          <Config parentToChild={editdata} parentFunction={parentFunction} />
        )}
        {isConfigVisible && (
          <Configs
            parentToChild={mulitiVehicles}
            parentFunction={parentFunction}
          />
        )}
        {isAdminUpdateVisible && (
          <AdminUpdate
            parentToChild={updatedata}
            parentFunction={parentFunction}
          />
        )}
        {isCustomerUpdateVisible && (
          <CustomerUpdate
            parentToChild={updatedata}
            parentFunction={parentFunction}
          />
        )}
      </div>
      <Popconfirm
        size="big"
        title="User"
        description="Are you sure to delete this user"
        open={deleteopen}
        placement="rightTop"
        onConfirm={handleOk}
        onCancel={handleCancel}
      >
        <Card title="Vehicle List">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mobileFlex={false}
          ></Flex>

          <Row>
            <Col sm={3} md={6} lg={6}>
              <Input
                style={{
                  width: "70%",
                }}
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
              />
            </Col>

            <Col sm={3} md={6} lg={6}>
              {currentRole == 6 && (
                <Select
                  mode="tags"
                  style={{
                    width: "95%",
                  }}
                  placeholder="Select Vehicle"
                  onChange={changeMutliVehicles}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Array.isArray(vehicleList) ? (
                    vehicleList.map((vehicle) => (
                      <Option key={vehicle.id} value={vehicle.id}>
                        {vehicle.vehicle_name}
                      </Option>
                    ))
                  ) : (
                    <Option value="Loading" disabled>
                      Loading...
                    </Option>
                  )}
                </Select>
              )}
            </Col>

            <Col sm={2} md={4} lg={4}>
              {currentRole == 6 && (
                <Button type="primary" ghost onClick={clickConfig}>
                  Config
                </Button>
              )}
            </Col>

            <Col sm={2} md={4} lg={4}></Col>
            <Col sm={2} md={4} lg={4}>
              {currentRole <= 5 && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showDrawer}
                  ghost
                >
                  Add Vehicle
                </Button>
              )}
            </Col>
          </Row>

          <div className="table-responsive">
            <Table
              bordered
              columns={tableColumns}
              dataSource={vehicleList}
              rowKey="id"
            />
          </div>
        </Card>
      </Popconfirm>

      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        width={1000}
        open={open}
        title="Add Vehicle"
      >
        <Spin spinning={loading} delay={500}>
          <Form
            form={form}
            name="device_form"
            onFinish={onFinish}
            layout="vertical"
          >
            <h4>Users Details :</h4>
            <Row gutter={[10, 10]}>
              {currentRole == 1 && (
                <Col sm={3} md={6} lg={6} xxl={6}>
                  <Form.Item name="admin_id" label="Admin Name">
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
                <Col sm={3} md={6} lg={6} xxl={6}>
                  <Form.Item name="distributor_id" label="Distributor Name">
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
                <Col sm={3} md={6} lg={6} xxl={6}>
                  <Form.Item name="dealer_id" label="Dealer Name">
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
                <Col sm={3} md={6} lg={6} xxl={6}>
                  <Form.Item name="subdealer_id" label="SubDealer Name">
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
                <Col sm={3} md={6} lg={6} xxl={6}>
                  <Form.Item
                    label="Client Name"
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
            <Row gutter={6}>
              <Col sm={12} md={12} lg={12} xxl={12}>
                <h4>Licence Details :</h4>
              </Col>
              <Col sm={12} md={12} lg={12} xxl={12}>
                <h4>SIM Details :</h4>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  label="Plan Type"
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
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  label="License Number"
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
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  label="Sim Mobile No"
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
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item label="Sim CCID">
                  <Input type="text" value={simData}></Input>
                </Form.Item>
              </Col>
            </Row>
            <h4>Device Details :</h4>
            <Row gutter={6}>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  label="Device IMEI No"
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
                <Form.Item label="Device UID">
                  <Input type="text" value={deviceData}></Input>
                </Form.Item>
              </Col>
              <Col sm={3} md={6} lg={6} xxl={6}>
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
                <Form.Item label="Device Make-Model">
                  <Input
                    type="textarea"
                    value={makeData + "-" + modelData}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <h4>Vehicle Details :</h4>
            <Row gutter={6}>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  label="Vehicle Type"
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
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  label="Vehicle Name"
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
              <Col sm={2} md={4} lg={4} xxl={4}>
                <Form.Item label="Expire Date">
                  <Input
                    value={expireDate}
                    disabled
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                </Form.Item>
              </Col>

              <Col sm={2} md={4} lg={4} xxl={4}>
                <Form.Item
                  name="vehicle_expire_date"
                  label="Vehicle Expire Date"
                >
                  <DatePicker
                    allowClear={false}
                    format={dateFormat}
                  ></DatePicker>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  name="service_person_name"
                  label="Service Person Name"
                >
                  <Input
                    type="text"
                    name="service_person_name"
                    placeholder="Service Person Name"
                  ></Input>
                </Form.Item>
              </Col>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item
                  name="install_person_name"
                  label="Install Person Name"
                >
                  <Input
                    type="text"
                    name="install_person_name"
                    placeholder="Install Person Name"
                  ></Input>
                </Form.Item>
              </Col>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item name="description" label="Vehicle Description">
                  <Input
                    type="text"
                    name="description"
                    placeholder="Description"
                  ></Input>
                </Form.Item>
              </Col>
              <Col sm={3} md={6} lg={6} xxl={6}>
                <Form.Item name="due_amount" label="Due Amount">
                  <Input
                    type="number"
                    name="due_amount"
                    placeholder="Due Amount"
                  ></Input>
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
    </>
  );
};

export default Vehicle;
