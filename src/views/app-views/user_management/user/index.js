import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Row,
  Col,
  Input,
  Form,
  Popconfirm,
  notification,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import api from "configs/apiConfig";
import utils from "utils";
import { GREEN_BASE } from "constants/ThemeConstant";

import Edit from "./edit";
import Create from "./create";

export const User = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [Createopen, setCreateDrawerOpen] = useState(false);
  const [Editopen, setEditDrawerOpen] = useState(false);

  const showCreateDrawer = () => {
    setCreateDrawerOpen(true);
  };
  const showEditDrawer = () => {
    setEditDrawerOpen(true);
  };
  const onClose = () => {
    setCreateDrawerOpen(false);
    setEditDrawerOpen(false);
  };

  const [userList, setUserList] = useState();
  const [mainuserList, setMainUserList] = useState();

  const [editdata, setEditData] = useState("");

  const [isuploadvisible, setUploadVisible] = useState(false);
  const [domainname, setDomainName] = useState("");
  const [loginimage, setLoginImage] = useState("");

  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async (record) => {
    const data = { id: record, user_id: user };
    try {
      await api.post("user/delete", data);
      openNotification("success", "User", "User Deleted Successfully!");
      setOpen(false);
      loadUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const getUser = () => {
    return localStorage.getItem("id");
  };
  const user = getUser();
  const getRole = () => {
    return localStorage.getItem("role");
  };
  const role = getRole();

  const parentFunction = () => {
    setCreateDrawerOpen(false);
    setEditDrawerOpen(false);
    setUploadVisible(false);
    loadUsers();
  };

  const loadUsers = async () => {
    const data = { user_id: user, role_id: role };
    try {
      const response = await api.post("user_list", data);
      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item, index) => ({
          s_no: index + 1, // Increment the serial number for each item
          id: item.id,
          name: item.name,
          email: item.email,
          mobile_no: item.mobile_no,
          password: item.password,
          role_id: item.role_id,
          role: item.role,
          country_id: item.country_id,
          country: item.country_name,
          address: item.address,
        }));

        setUserList(processedData);
        setMainUserList(processedData);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  function handleEditClick(record) {
    showEditDrawer();
    setEditData([
      record.id,
      record.name,
      record.email,
      record.mobile_no,
      record.password,
      record.role_id,
      record.role,
      record.country_id,
      record.country,
      record.address,
    ]);

    // Set isEditVisible to true
    setUploadVisible(false);
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const tableColumns = [
    {
      title: "S No",
      dataIndex: "s_no",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_no",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record) => (
        <div>
          <span
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => handleEditClick(record)}
          >
            <EditTwoTone />
          </span>
          <Popconfirm
            title="User"
            description="Are you sure to delete this user"
            placement="left"
            onConfirm={() => handleDelete(record.id)} // Call your delete function here
            onCancel={() => handleCancel()}
          >
            <span style={{ cursor: "pointer" }}>
              <DeleteTwoTone />
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onSearch = (e) => {
    const searchValue = e.currentTarget.value;
    const searchArray = searchValue ? userList : mainuserList; // Use a different source if needed
    const filteredUserList = utils.wildCardSearch(searchArray, searchValue);
    setUserList(filteredUserList);
    setSelectedRowKeys([]);
  };

  const saveLogo = async () => {
    const formData = new FormData();
    formData.append("domain_name", domainname);
    formData.append("login_image", loginimage);

    try {
      await api.post("login_image_save", formData);
      openNotification("success", "Data", "Data Saved Successfully!");
      setLoginImage("");
      setDomainName("");
      setUploadVisible(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("domain_name")) {
            openNotification("info", "Domain", "Domain Name Required");
          }
          if (validationErrors.hasOwnProperty("login_image")) {
            openNotification("info", "Image", "Login Image Required");
          }
        }
      }
    }
  };

  return (
    <>
      <Drawer
        width={500}
        title="New User"
        placement="right"
        onClose={onClose}
        open={Createopen}
      >
        <Create parentFunction={parentFunction} />
      </Drawer>
      <Drawer
        width={500}
        title="Edit User"
        placement="right"
        onClose={onClose}
        open={Editopen}
      >
        <Edit
          key={editdata[0]}
          parentToChild={editdata}
          parentFunction={parentFunction}
        />
      </Drawer>

      <Card title="User">
        <Row justify="space-between">
          <Col span={4}>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              ghost
              onClick={showCreateDrawer}
            >
              Add User
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={tableColumns}
          dataSource={userList}
          rowKey="id"
        />
      </Card>

      {isuploadvisible && (
        <Card>
          <div className="container">
            <Row gutter={[8, 8]}>
              <Col sm={12} md={12} lg={12}>
                <Form.Item size="small" label="Domain Name" name="domain_name">
                  <Input
                    type="text"
                    onChange={(e) => setDomainName(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Item size="small" label="Login Image" name="login_image">
                  <Input
                    type="file"
                    onChange={(e) => setLoginImage(e.target.files[0])}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <Button
              size="small"
              type="primary"
              style={{ backgroundColor: GREEN_BASE }}
              success
              shape="round"
              onClick={saveLogo}
            >
              SAVE
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
export default User;
