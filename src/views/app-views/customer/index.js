import React, { useState } from "react";
import { Table, Button, Card, Drawer, Select, Input, Form } from "antd";
import Flex from "components/shared-components/Flex";
import {
  PlusOutlined,
  FileExcelOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import utils from "utils";
import OrderListData from "assets/data/order-list.data.json";
import userData from "assets/data/user-list.data.json";
const { Option } = Select;
export const Customer = () => {
  const [list, setList] = useState(userData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
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
      dataIndex: "personalInfo.phoneNumber",
    },

    {
      title: "Created On",
      dataIndex: "created_at",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const handleShowStatus = (value) => {
    if (value !== "All") {
      const key = "paymentStatus";
      const data = utils.filterArray(OrderListData, key, value);
      setList(data);
    } else {
      setList(OrderListData);
    }
  };
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : OrderListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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
      <Card title="Customer">
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
            <div className="mr-md-3 mb-3">
              <Select
                defaultValue="All"
                className="w-100"
                style={{ minWidth: 180 }}
                onChange={handleShowStatus}
                placeholder="Dealer"
              >
                <Option value="All">Acute</Option>
              </Select>
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                className="w-100"
                style={{ minWidth: 180 }}
                onChange={handleShowStatus}
                placeholder="Customer"
              >
                <Option value="1">Customer 1</Option>
                <Option value="2">Customer 2</Option>
                <Option value="3">Customer 3</Option>
                <Option value="4">Customer 4</Option>
              </Select>
            </div>
            <div className="mb-3">
              <Button type="primary" icon={<FileExcelOutlined />}>
                Export
              </Button>
            </div>

            <div className="mb-3"></div>
          </Flex>
          <div className="mb-3">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showDrawer}
              ghost
            >
              Add Customer
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            bordered
            columns={tableColumns}
            dataSource={list}
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
      <Drawer placement="right" closable={false} onClose={onClose} open={open}>
        <div className="container">
          <h2>Customer Info</h2>
          <Form name="customer_add">
            <Form.Item
              name="customer_name"
              rules={[
                { required: true, message: "Customer Name is Required!" },
              ]}
            >
              <Input type="text" placeholder="Customer Name" />
            </Form.Item>
            <Form.Item
              name="mobile_number"
              rules={[
                { required: true, message: "Mobile Number is Required!" },
              ]}
            >
              <Input type="text" placeholder="Mobile Number" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is Required!" }]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[
                { required: true, message: "Confirm Password is Required!" },
              ]}
            >
              <Input type="password" placeholder="Retype Password" />
            </Form.Item>
            <Form.Item name="submit" rules={[{ required: true }]}>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default Customer;
