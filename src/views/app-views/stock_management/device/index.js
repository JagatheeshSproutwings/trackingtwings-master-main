import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Row,
  Col,
  Input,
  Popconfirm,
  notification,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditTwoTone,
  DeleteTwoTone,
  SwapOutlined,
} from "@ant-design/icons";
import utils from "utils";
import api from "configs/apiConfig";

import Create from "./create";
import Edit from "./edit";
import Assign from "../demo/index";

export const Device = () => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const getUser = () => {
    return localStorage.getItem("id");
  };
  const user = getUser();

  const handleDelete = async (record) => {
    const data = { id: record, user_id: user };
    try {
      const response = await api.post("device/delete", data);
      openNotification("success", "Device", "Device Deleted Successfully!");
      setOpen(false);
      loadDevices();
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

  const [deviceList, setDeviceList] = useState([]);
  const [maindeviceList, setMainDeviceList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [editdata, setEditData] = useState("");
  const [assigndata, setAssignData] = useState("");

  const [Createopen, setCreateDrawerOpen] = useState(false);
  const [Editopen, setEditDrawerOpen] = useState(false);
  const [Assignopen, setAssignDrawerOpen] = useState(false);

  const showCreateDrawer = () => {
    setCreateDrawerOpen(true);
  };
  const showEditDrawer = () => {
    setEditDrawerOpen(true);
  };
  const showAssignDrawer = () => {
    setAssignDrawerOpen(true);
  };
  const onClose = () => {
    setCreateDrawerOpen(false);
    setEditDrawerOpen(false);
    setAssignDrawerOpen(false);
  };
  const parentFunction = () => {
    loadDevices();
    onClose();
  };
  const loadDevices = async () => {
    try {
      const response = await api.post("device_list");

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item, index) => ({
          s_no: index + 1, // Increment the serial number for each item
          id: item.id,
          supplier_id: item.supplier_id,
          supplier_name: item.supplier_name,
          device_imei_no: item.device_imei_no,
          ccid: item.ccid,
          uid: item.uid,
          device_make_id: item.device_make_id,
          device_model_id: item.device_model_id,
          device_make: item.device_make,
          device_model: item.device_model,
          description: item.description,
        }));
        setDeviceList(processedData);
        setMainDeviceList(processedData);
      } else {
        setDeviceList("");
        setMainDeviceList("");
        console.error("API request was not successful");
      }
    } catch (error) {
      setDeviceList("");
      setMainDeviceList("");
      console.error("Error fetching users:", error);
    }
  };
  function handleEditClick(record) {
    showEditDrawer();

    setEditData([
      record.id,
      record.supplier_id,
      record.supplier_name,
      record.device_make_id,
      record.device_make,
      record.device_model_id,
      record.device_model,
      record.device_imei_no,
      record.ccid,
      record.uid,
      record.description,
    ]);
  }
  function handleAssignClick(record) {
    showAssignDrawer();
    const id = record.id;
    const type = "Device";
    const device_imei_no = record.device_imei_no;
    const data = [id, type, device_imei_no];
    setAssignData(data);
  }

  useEffect(() => {
    loadDevices();
  }, []);
  const tableColumns = [
    {
      title: "S No",
      dataIndex: "s_no",
      fixed: "left",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
    },
    {
      title: "Device No",
      dataIndex: "device_imei_no",
    },
    {
      title: "Device Make",
      dataIndex: "device_make",
    },
    {
      title: "Device Model",
      dataIndex: "device_model",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record) => (
        <div>
          <span
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => handleAssignClick(record)}
          >
            <SwapOutlined />
          </span>
          <span
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => handleEditClick(record)}
          >
            <EditTwoTone />
          </span>
          <Popconfirm
            title="Device"
            description="Are you sure to delete this Device"
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
    const searchArray = searchValue ? deviceList : maindeviceList; // Use a different source if needed
    const filteredUserList = utils.wildCardSearch(searchArray, searchValue);
    setDeviceList(filteredUserList);
    setSelectedRowKeys([]);
  };

  return (
    <>
      <Drawer
        width={500}
        title="New Device"
        placement="right"
        onClose={onClose}
        open={Createopen}
      >
        <Create parentFunction={parentFunction} />
      </Drawer>
      <Drawer
        width={500}
        title="Edit Device"
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
      <Drawer
        width={500}
        title="Assign Device"
        placement="right"
        onClose={onClose}
        open={Assignopen}
      >
        <Assign
          key={assigndata[0]}
          parentToChild={assigndata}
          parentFunction={parentFunction}
        />
      </Drawer>

      <Card title="Device">
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
              Add Device
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={tableColumns}
          dataSource={deviceList}
          rowKey="id"
        />
      </Card>
    </>
  );
};
export default Device;
