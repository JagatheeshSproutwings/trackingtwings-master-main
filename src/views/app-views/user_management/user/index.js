import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row, Col, Input } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
import utils from "utils";

import Edit from "./edit";
import Create from "./create";

export const User = () => {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editdata, setEditData] = useState("");

  const handleCreateCard = () => {
    setIsCreateVisible(true);
    setIsEditVisible(false);
  };
  const handleEditCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(true);
  };

  const getUser = () => {
    return localStorage.getItem("id");
  };

  const user = getUser();

  const getRole = () => {
    return localStorage.getItem("role");
  };
  const role = getRole();

  async function loadUsers(setUserList) {
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
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleEditClick(record) {
    handleEditCard();

    const id = record.id;
    const name = record.name;
    const email = record.email;
    const mobile_no = record.mobile_no;
    const password = record.password;
    const role = record.role;
    const role_id = record.role_id;
    const country = record.country;
    const country_id = record.country_id;
    const address = record.address;

    const data = [
      id,
      name,
      email,
      mobile_no,
      password,
      role_id,
      role,
      country_id,
      country,
      address,
    ];

    setEditData(data);
  }

  useEffect(() => {
    loadUsers(setUserList);
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
      title: "Edit",
      dataIndex: "edit",
      render: (_, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleEditClick(record)}
        >
          <EditOutlined />
        </span>
      ),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? userList : [];
    const data = utils.wildCardSearch(searchArray, value);
    setUserList(data);
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
      <Row gutter={6}>
        <Col sm={24} md={14} lg={14}>
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
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  ghost
                  onClick={handleCreateCard}
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
                rowSelection={{
                  selectedRowKeys: selectedRowKeys,
                  type: "checkbox",
                  preserveSelectedRowKeys: false,
                  ...rowSelection,
                }}
              />
            </div>
          </Card>
        </Col>
        <Col sm={24} md={10} lg={10}>
          {isCreateVisible && <Create />}
          {isEditVisible && <Edit parentToChild={editdata} />}
        </Col>
      </Row>
    </>
  );
};
export default User;
