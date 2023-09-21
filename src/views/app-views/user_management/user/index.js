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
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
import utils from "utils";
import { GREEN_BASE } from "constants/ThemeConstant";

import Edit from "./edit";
import Create from "./create";

export const User = () => {
  const [Createopen, setCreateDrawerOpen] = useState(false);
  const [Editopen, setEditDrawerOpen] = useState(false);

  const showCreateDrawer = () => {
    setCreateDrawerOpen(true);
  };
  const onClose = () => {
    setCreateDrawerOpen(false);
    setEditDrawerOpen(false);
  };

  const showEditDrawer = () => {
    setEditDrawerOpen(true);
  };

  const [userList, setUserList] = useState();
  const [mainuserList, setMainUserList] = useState();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editdata, setEditData] = useState("");
  const [domainname, setDomainName] = useState("");
  const [loginimage, setLoginImage] = useState("");

  const [isuploadvisible, setUploadVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const showPopconfirm = (record) => {
    setDeleteID(record.id);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    const data = { id: deleteID, user_id: user };

    try {
      const response = await api.post("user/delete", data);
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

  const handleCreateCard = () => {
    setIsCreateVisible(true);
    setIsEditVisible(false);
    setUploadVisible(false);
  };

  const handleUploadCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(false);
    setUploadVisible(true);
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
    setIsCreateVisible(false);
    setIsEditVisible(false);
    setUploadVisible(false);
    setCreateDrawerOpen(false);
    setEditDrawerOpen(false);
    loadUsers();
  };

  const loadUsers = async () => {
    const data = { user_id: user, role_id: role };
    try {
      const response = await api.post("user_list", data);

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
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

        console.log(processedData);
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
    setIsEditVisible(true);
    setUploadVisible(false);
    setIsCreateVisible(false);
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const tableColumns = [
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
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showPopconfirm(record)} // Replace handleEditClick with your custom action function
          >
            <DeleteTwoTone />
          </span>
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

  const myclick = async () => {
    console.warn(domainname, loginimage);

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
      <Row gutter={6}>
        <Col sm={24} md={14} lg={14}>
          <Popconfirm
            size="big"
            title="User"
            description="Are you sure to delete this user"
            open={open}
            placement="rightTop"
            onConfirm={handleOk}
            onCancel={handleCancel}
          >
            <Card title="User">
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
                <div className="mb-3">
                  {/* {role == 1 && (
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      ghost
                      onClick={handleUploadCard}
                    >
                      Upload Logo
                    </Button>
                  )} */}
                </div>
                <div className="mb-3">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    ghost
                    onClick={showCreateDrawer}
                  >
                    Add User
                  </Button>
                </div>
              </Flex>
              <div className="table-responsive">
                <Table
                  bordered
                  columns={tableColumns}
                  dataSource={userList}
                  rowKey="id"
                />
              </div>
            </Card>
          </Popconfirm>
        </Col>
        <Col sm={24} md={10} lg={10}>
          {isCreateVisible && <Create parentFunction={parentFunction} />}

          {isuploadvisible && (
            <Card>
              <Flex>
                <div className="container">
                  <Row gutter={[8, 8]}>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="Domain Name"
                        name="domain_name"
                      >
                        <Input
                          type="text"
                          onChange={(e) => setDomainName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                      <Form.Item
                        size="small"
                        label="Login Image"
                        name="login_image"
                      >
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
                    onClick={myclick}
                  >
                    SAVE
                  </Button>
                </div>
              </Flex>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};
export default User;
