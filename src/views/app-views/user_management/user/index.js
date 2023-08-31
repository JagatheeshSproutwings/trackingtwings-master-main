import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row, Col, Input } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import utils from "utils";
import OrderListData from "assets/data/order-list.data.json";
import userData from "assets/data/user-list.data.json";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";

import Create from "./create";
import Edit from "./edit";

export const User = () => {
  const [userList, setUserList] = useState(userData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  async function loadUsers(setUserList) {
    try {
      const response = await api.get(`user_list/${user}`);

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          mobile_no: item.mobile_no,
          role: item.role,
          role_id: item.role_id,
          country_id: item.country_id,
          country: item.country_name,
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
    const email = record.email;
    const mobile_no = record.mobile_no;
    const role = record.role;
    const role_id = record.role_id;
    const country = record.country;
    const country_id = record.country_id;

    const data = [id, email, mobile_no, role, role_id, country, country_id];

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
    const searchArray = e.currentTarget.value ? userList : OrderListData;
    const data = utils.wildCardSearch(searchArray, value);
    setUserList(data);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    onChange: (key, rows) => {
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
