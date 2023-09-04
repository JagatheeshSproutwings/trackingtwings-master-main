import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row, Col, Input } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";

export const Configurations = () => {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // async function loadUsers(setUserList) {
  //   const data = { user_id: user, role_id: role };
  //   try {
  //     const response = await api.post("user_list", data);

  //     if (response.data && Array.isArray(response.data.data)) {
  //       const processedData = response.data.data.map((item) => ({
  //         id: item.id,
  //         name: item.name,
  //         email: item.email,
  //         mobile_no: item.mobile_no,
  //         password: item.password,
  //         role_id: item.role_id,
  //         role: item.role,
  //         country_id: item.country_id,
  //         country: item.country_name,
  //         address: item.address,
  //       }));

  //       console.log(processedData);
  //       setUserList(processedData);
  //     } else {
  //       console.error("API request was not successful");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // }

  // useEffect(() => {
  //   loadUsers(setUserList);
  // }, []);

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
          // onClick={() => handleEditClick(record)}
        >
          <EditOutlined />
        </span>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRowKeys(key);
    },
  };

  return (
    <>
      <Row gutter={6}>
        <Col sm={24} md={14} lg={14}>
          <Card title="Vehcicle Configurations">
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
                    // onChange={(e) => onSearch(e)}
                  />
                </div>
              </Flex>
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
        <Col sm={24} md={10} lg={10}></Col>
      </Row>
    </>
  );
};
export default Configurations;
