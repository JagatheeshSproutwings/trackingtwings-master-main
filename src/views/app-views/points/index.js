import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Drawer,
  Select,
  Input,
  Form,
  notification,
} from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import utils from "utils";

const { Option } = Select;
export const User = () => {
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);

  const [pointList, setPointList] = useState([]);
  const [mainpointList, setMainPointList] = useState([]);

  const [userList, setUserList] = useState([]);
  const [selectedPlanId, setselectedPlanId] = useState();
  const [PlanOptions, setPlanOptions] = useState([]);
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    SetCurrentRole(role());
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const user = () => {
    return localStorage.getItem("id");
  };
  const role = () => {
    return localStorage.getItem("role");
  };
  const admin = () => {
    return localStorage.getItem("admin_id");
  };
  const distributor = () => {
    return localStorage.getItem("distributor_id");
  };
  const dealer = () => {
    return localStorage.getItem("dealer_id");
  };
  const subdealer = () => {
    return localStorage.getItem("subdealer_id");
  };

  const admin_id = admin();
  const distributor_id = distributor();
  const dealer_id = dealer();
  const subdealer_id = subdealer();
  const created_by = user();
  const role_id = role();

  const onFinish = async (values) => {
    const updatedValues = {
      ...values,
      admin_id,
      distributor_id,
      dealer_id,
      subdealer_id,
      created_by,
      role_id,
    };

    try {
      await api.post("point", updatedValues);
      form.resetFields();
      openNotification("success", "Point", "Point Saved Successfully!");
      loadPoints();
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        openNotification("error", "Point", errorData.message);
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          openNotification("error", "Point", validationErrors);
        }
      }
    }
  };

  async function fetchPlanOptions() {
    try {
      const response = await api.get("plan");
      if (response.data.success) {
        setPlanOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  async function loadUsers() {
    const data = { user_id: created_by, role_id: role_id };

    try {
      const response = await api.post("user_point_list", data);
      console.log(response);
      if (response.data.success) {
        setUserList(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function loadPoints() {
    try {
      const data = { user_id: created_by, role_id: role_id };
      const response = await api.post("point_stock_list", data);

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
          id: item.id,
          point_type: item.point_type,
          package_code: item.package_code,
          package_name: item.package_name,
          period_name: item.period_name,
          period_days: item.period_days,
          name: item.name,
          total_point: item.total_point,
        }));

        console.log(processedData);
        setPointList(processedData);
        setMainPointList(processedData);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Inside your component
  useEffect(() => {
    fetchPlanOptions();
    loadUsers();
    loadPoints();
  }, []);

  const handlePlanIdChange = (countryId) => {
    setselectedPlanId(countryId);
  };

  const tableColumns = [
    {
      title: "Point Type",
      dataIndex: "point_type",
    },
    {
      title: "Package Code",
      dataIndex: "package_code",
    },
    {
      title: "Package Name",
      dataIndex: "package_name",
    },
    {
      title: "Period Name",
      dataIndex: "period_name",
    },
    {
      title: "Period Days",
      dataIndex: "period_days",
    },
    {
      title: "Total Points",
      dataIndex: "total_point",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? pointList : mainpointList;
    const data = utils.wildCardSearch(searchArray, value);
    setPointList(data);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  return (
    <>
      <Card title="Points">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mobileFlex={false}
        >
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
          {currentRole != 5 && (
            <div className="mb-3">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
                ghost
              >
                Add Points
              </Button>
            </div>
          )}
        </Flex>
        <div className="table-responsive">
          <Table
            bordered
            columns={tableColumns}
            dataSource={pointList}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: "checkbox",
              preserveSelectedRowKeys: false,
              ...rowSelection,
            }}
          />
        </div>
      </Card>

      <Drawer placement="left" closable={false} onClose={onClose} open={open}>
        <div className="container">
          <h2>Point Info</h2>
          <Form
            name="registrationForm"
            onFinish={onFinish}
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="User"
              name="user_id"
              rules={[{ required: true, message: "Please Select Plan" }]}
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                value={setUserList}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {Array.isArray(userList) ? (
                  userList.map((user) => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                  ))
                ) : (
                  <Option value="Loading">Loading...</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Point Type"
              name="point_type_id"
              rules={[{ required: true, message: "Please Select Point Type" }]}
            >
              <Select>
                <Option value="1">New Point</Option>
                <Option value="2">Recharge Point</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Plan"
              name="plan_id"
              rules={[{ required: true, message: "Please Select Plan" }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                allowClear
                onChange={handlePlanIdChange}
                value={selectedPlanId}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {Array.isArray(PlanOptions) ? (
                  PlanOptions.map((plan) => (
                    <Option key={plan.id} value={plan.id}>
                      {plan.package_name + "  -  " + plan.period_name}
                    </Option>
                  ))
                ) : (
                  <Option value="Loading">Loading...</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Points"
              name="total_point"
              rules={[{ required: true, message: "Please Enter Points" }]}
            >
              <Input type="number" max={100} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default User;
