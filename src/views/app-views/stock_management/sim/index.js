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

export const Sim = () => {
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
      const response = await api.post("sim/delete", data);
      openNotification("success", "Sim", "Sim Deleted Successfully!");
      setOpen(false);
      loadSims();
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

  const [simList, setSimList] = useState([]);
  const [mainsimList, seMainSimList] = useState([]);
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
    loadSims();
    onClose();
  };

  const loadSims = async () => {
    try {
      const response = await api.post("sim_list");

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item, index) => ({
          s_no: index + 1, // Increment the serial number for each item
          id: item.id,
          network_id: item.network_id,
          network_provider_name: item.network_provider_name,
          sim_imei_no: item.sim_imei_no,
          sim_mob_no1: item.sim_mob_no1,
          sim_mob_no2: item.sim_mob_no2,
          valid_from: item.valid_from,
          valid_to: item.valid_to,
        }));
        setSimList(processedData);
        seMainSimList(processedData);
      } else {
        setSimList("");
        seMainSimList("");
        console.error("API request was not successful");
      }
    } catch (error) {
      setSimList("");
      seMainSimList("");
      console.error("Error fetching users:", error);
    }
  };
  function handleEditClick(record) {
    showEditDrawer();

    setEditData([
      record.id,
      record.network_id,
      record.network_provider_name,
      record.sim_imei_no,
      record.sim_mob_no1,
      record.sim_mob_no2,
      record.valid_form,
      record.valid_to,
    ]);
  }
  function handleAssignClick(record) {
    showAssignDrawer();
    const id = record.id;
    const type = "Sim";
    const sim_imei_no = record.sim_imei_no;
    const data = [id, type, sim_imei_no];
    setAssignData(data);
  }

  useEffect(() => {
    loadSims();
  }, []);
  const tableColumns = [
    {
      title: "S No",
      dataIndex: "s_no",
      fixed: "left",
    },
    {
      title: "Network",
      dataIndex: "network_provider_name",
    },
    {
      title: "Sim IMEI No",
      dataIndex: "sim_imei_no",
    },
    {
      title: "Sim Mobile Number",
      dataIndex: "sim_mob_no1",
    },
    {
      title: "Sim Mobile Number",
      dataIndex: "sim_mob_no2",
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
            title="Sim"
            description="Are you sure to delete this sim"
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
    const searchArray = searchValue ? simList : mainsimList; // Use a different source if needed
    const filteredUserList = utils.wildCardSearch(searchArray, searchValue);
    setSimList(filteredUserList);
    setSelectedRowKeys([]);
  };

  return (
    <>
      <Drawer
        width={500}
        title="New Sim"
        placement="right"
        onClose={onClose}
        open={Createopen}
      >
        <Create parentFunction={parentFunction} />
      </Drawer>
      <Drawer
        width={500}
        title="Edit Sim"
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
        title="Assign Sim"
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

      <Card title="Sim">
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
              Add Sim
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={tableColumns}
          dataSource={simList}
          rowKey="id"
        />
      </Card>
    </>
  );
};
export default Sim;
