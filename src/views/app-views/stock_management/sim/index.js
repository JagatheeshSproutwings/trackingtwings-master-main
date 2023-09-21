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
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";

import api from "configs/apiConfig";
import Create from "./create";
import Edit from "./edit";
import Assign from "../demo/index";

export const Sim = () => {
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
    alert(deleteID);
    const data = { id: deleteID, user_id: currentUser };

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

  const currentUser = localStorage.getItem("id") || "";
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [simList, setSimList] = useState([]);
  const [mainsimList, seMainSimList] = useState([]);

  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isAssignVisible, setIsAssignVisible] = useState(false);

  const [editdata, setEditData] = useState("");
  const [assigndata, setAssignData] = useState("");

  const handleCreateCard = () => {
    setIsCreateVisible(true);
    setIsEditVisible(false);
    setIsAssignVisible(false);
  };
  const handleAssignCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(false);
    setIsAssignVisible(true);
  };
  const parentFunction = () => {
    setIsEditVisible(false);
    loadSims();
  };

  const loadSims = async () => {
    try {
      const response = await api.post("sim_list");

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
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

    // Set isEditVisible to true
    setIsEditVisible(true);
    setIsCreateVisible(false);
    setIsAssignVisible(false);
  }

  function handleAssignClick(record) {
    handleAssignCard();

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
            onClick={() => handleEditClick(record)}
          >
            <EditTwoTone />
          </span>
          <span
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => handleAssignClick(record)}
          >
            <EditTwoTone />
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showPopconfirm(record)}
          >
            <DeleteTwoTone />
          </span>
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
      <Row gutter={6}>
        <Col sm={24} md={14} lg={14}>
          <Popconfirm
            size="big"
            title="Sim"
            description="Click OK to Delete this Sim"
            open={open}
            placement="rightTop"
            onConfirm={handleOk}
            onCancel={handleCancel}
          >
            <Card title="Sim">
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
                    Add Sim
                  </Button>
                </div>
              </Flex>

              <div className="table-responsive">
                <Table
                  bordered
                  columns={tableColumns}
                  dataSource={simList}
                  rowKey="id"
                />
              </div>
            </Card>
          </Popconfirm>
        </Col>
        <Col sm={24} md={10} lg={10}>
          {isCreateVisible && <Create parentFunction={parentFunction} />}

          {isAssignVisible && (
            <Assign
              key={assigndata[0]}
              parentToChild={assigndata}
              parentFunction={parentFunction}
            />
          )}
          {isEditVisible && (
            <Edit
              key={editdata[0]}
              parentToChild={editdata}
              parentFunction={parentFunction}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
export default Sim;
